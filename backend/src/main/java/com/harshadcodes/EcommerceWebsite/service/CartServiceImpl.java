package com.harshadcodes.EcommerceWebsite.service;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.Cart;
import com.harshadcodes.EcommerceWebsite.model.CartItem;
import com.harshadcodes.EcommerceWebsite.model.Product;
import com.harshadcodes.EcommerceWebsite.payload.CartDTO;
import com.harshadcodes.EcommerceWebsite.payload.CartItemDTO;
import com.harshadcodes.EcommerceWebsite.payload.ProductDTO;
import com.harshadcodes.EcommerceWebsite.repositories.CartItemRepository;
import com.harshadcodes.EcommerceWebsite.repositories.CartRepository;
import com.harshadcodes.EcommerceWebsite.repositories.ProductRepository;
import com.harshadcodes.EcommerceWebsite.utils.AuthUtils;
import com.harshadcodes.EcommerceWebsite.utils.InsertImageUrl;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService{

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;
    private final ModelMapper modelMapper;

    private final Logger logger= LoggerFactory.getLogger(CartServiceImpl.class);

    private final AuthUtils authUtils;
    private final InsertImageUrl insertImageUrl;

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) throws Exception {
        Cart userCart= createCart();

        Product product=productRepository.findById(productId)
                .orElseThrow(()->new ResourceNotFoundException("Product","ProductId",productId));

        CartItem savedItem=cartItemRepository.findByProductIdAndCartId(productId,userCart.getCartId());

        if(savedItem!=null){
            throw new Exception("product with name "+product.getProductName()+" Already exist in the cart");
        }

        if(product.getProductQuantity() == 0){
            throw new Exception(product.getProductName()+" is out of stock try again letter");
        }

        if(product.getProductQuantity()<quantity){
            throw new Exception(product.getProductName()+" has not enough stock\nAvailable product stock"+product.getProductQuantity());
        }

        CartItem cartItem=new CartItem();

        cartItem.setProduct(product);
        cartItem.setCart(userCart);
        cartItem.setQuantity(quantity);
        cartItem.setProductPrice(product.getProductPrice());
        cartItem.setDiscount(product.getProductDiscount());
        cartItem.setDiscountedPrice(product.getProductDiscountedPrice());

        userCart.getCartItems().add(cartItem);

        userCart.setTotalPrice(userCart.getTotalPrice()+(product.getProductDiscountedPrice()*quantity));

        cartRepository.save(userCart);

        CartDTO cartDTO=modelMapper.map(userCart,CartDTO.class);

        List<ProductDTO> productDTOs = userCart.getCartItems().stream()
                .map(item -> {
                    ProductDTO dto = modelMapper.map(item.getProduct(), ProductDTO.class);
                    dto.setProductQuantity(item.getQuantity());
                    return dto;
                })
                .toList();

        cartDTO.setProductDTOs(productDTOs);
        return cartDTO;

    }

    @Override
    public List<CartDTO> getAllCarts() throws Exception {

        List<Cart> carts=cartRepository.findAll();

        if(carts.isEmpty()){
            throw new Exception("No carts available");
        }

        List<CartDTO> cartDTOS=carts.stream().map(cart -> {
            CartDTO cartDTO=modelMapper.map(cart,CartDTO.class);
            List<ProductDTO> productDTOS=cart.getCartItems().stream()
                    .map(item-> {
                        ProductDTO dto=modelMapper.map(item.getProduct(),ProductDTO.class);
                        dto.setProductQuantity(item.getQuantity());
                        dto.setProductImage(insertImageUrl.constructImageUrl(item.getProduct().getProductImage()));
                        return dto;
                    }).collect(Collectors.toList());
            cartDTO.setProductDTOs(productDTOS);

            return cartDTO;
        }).toList();


        return cartDTOS;
    }

    @Override
    public CartDTO getUserCart() throws Exception {
       String email= authUtils.getLoggedinEmail();
       Cart cart=cartRepository.findCartByEmail(email);

       if(cart==null){
           throw new ResourceNotFoundException("cart","email",email);
       }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);

        List<ProductDTO> productDTOs = cart.getCartItems().stream()
                .map(item -> {
                    ProductDTO dto = modelMapper.map(item.getProduct(), ProductDTO.class);
                    dto.setQuantity(item.getQuantity()); // cart quantity, not stock quantity
                    dto.setProductImage(insertImageUrl.constructImageUrl(item.getProduct().getProductImage()));
                    return dto;
                })
                .toList();

       cartDTO.setProductDTOs(productDTOs);
       return cartDTO;
    }

    @Transactional
    @Override
    public CartDTO updateUserCart(Long productId, String operation) throws Exception {
        Integer updatedQuantity= operation.equalsIgnoreCase("remove")?-1:1;

        String email=authUtils.getLoggedinEmail();
        Cart savedCart=cartRepository.findCartByEmail(email);
        Long cartId=savedCart.getCartId();

        Cart cart=cartRepository.findById(cartId).orElseThrow(()->
                new ResourceNotFoundException("Cart","CartId",cartId));

        Product savedproduct=productRepository.findById(productId).orElseThrow(()->
                new ResourceNotFoundException("Product","ProductId",productId));

        if(savedproduct.getProductQuantity()==0){
            throw new Exception(savedproduct.getProductName()+" is out of stock");
        }

        int afterUpdateQuantity=savedproduct.getProductQuantity()+updatedQuantity;

        if(savedproduct.getProductQuantity()<afterUpdateQuantity){
            throw new Exception(savedproduct.getProductName()+" does not have enough stock\nTotal remaining quantity: "+savedproduct.getProductQuantity());
        }

        CartItem savedCartItem=cartItemRepository.findByProductIdAndCartId(productId,cartId);

        if(savedCartItem == null){
            throw new Exception(savedproduct.getProductName()+" does not exist in cart");
        }

        if(afterUpdateQuantity==0){
            deleteCartItem(productId,cartId);
        }
        else {
            savedCartItem.setProductPrice(savedproduct.getProductPrice());
            savedCartItem.setDiscount(savedproduct.getProductDiscount());
            savedCartItem.setDiscountedPrice(savedproduct.getProductDiscountedPrice());
            savedCartItem.setQuantity(savedCartItem.getQuantity() + updatedQuantity);
            savedCart.setTotalPrice(savedCart.getTotalPrice() + (savedCartItem.getDiscountedPrice() * updatedQuantity));
            cartRepository.save(savedCart);

        }
        CartItem updatedCartItem = cartItemRepository.save(savedCartItem);
        if(updatedCartItem.getQuantity()==0){
            cartItemRepository.deleteById(updatedCartItem.getCartItemId());
        }

        CartDTO cartDTO= modelMapper.map(savedCart,CartDTO.class);

        List<ProductDTO> productDTOS=savedCart.getCartItems().stream().map(item->{
                ProductDTO dto=modelMapper.map(item.getProduct(),ProductDTO.class);
                dto.setProductQuantity(item.getQuantity());
                return dto;
                }
                ).toList();

        cartDTO.setProductDTOs(productDTOS);
        return cartDTO;
    }

    @Transactional
    @Override
    public String deleteCartItem(Long productId, Long cartId) {

        Cart cart=cartRepository.findById(cartId).orElseThrow(
                ()->new ResourceNotFoundException("cart","cartId",cartId));

        CartItem savedCartItem=cartItemRepository.findByProductIdAndCartId(productId, cartId);

        if (savedCartItem ==null){
            throw new ResourceNotFoundException("product","productId",productId);
        }

        Double updatedTotalPrice=cart.getTotalPrice()-(savedCartItem.getDiscountedPrice()* savedCartItem.getQuantity());

        cart.setTotalPrice(updatedTotalPrice);

        cartItemRepository.deleteCartItemByProductIdAndCartId(productId,cartId);

        return "Product "+savedCartItem.getProduct().getProductName()+" deleted from the cart";

    }

    @Transactional
    @Override
    public boolean updateProductInSideCart(Long productId, Long cartId) throws Exception {
        Cart cart=cartRepository.findById(cartId).orElseThrow(
                ()->new ResourceNotFoundException("Cart","cartId",cartId));

        Product product=productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product","productId",productId));

        CartItem cartItem=cartItemRepository.findByProductIdAndCartId(productId,cartId);

        if(cartItem == null){
            throw new Exception("Product"+ product.getProductName()+ " does not exist in the cart");
        }

        Double updatedTotal = cart.getTotalPrice() -(cartItem.getDiscountedPrice()*cartItem.getQuantity());

        cartItem.setProductPrice(product.getProductPrice());
        cartItem.setDiscount(product.getProductDiscount());
        cartItem.setDiscountedPrice(product.getProductDiscountedPrice());

        cart.setTotalPrice(updatedTotal +(cartItem.getDiscountedPrice()+cartItem.getQuantity()));

        cartItemRepository.save(cartItem);
        return true;
    }

    @Transactional
    @Override
    public String createOrUpdateCartWithItems(List<CartItemDTO> cartItems) {
        // Get user's email
        String emailId = authUtils.getLoggedinEmail();

        // Check if an existing cart is available or create a new one
        Cart existingCart = cartRepository.findCartByEmail(emailId);
        if (existingCart == null) {
            existingCart = new Cart();
            existingCart.setTotalPrice(0.00);
            existingCart.setUser(authUtils.getLoggedinUser());
            existingCart = cartRepository.save(existingCart);
        } else {
            // Clear all current items in the existing cart
            cartItemRepository.deleteAllByCartId(existingCart.getCartId());

        }

        double totalPrice = 0.00;

        // Process each item in the request to add to the cart
        for (CartItemDTO cartItemDTO : cartItems) {
            Long productId = cartItemDTO.productId();
            Integer quantity = cartItemDTO.quantity();

            // Find the product by ID
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ResourceNotFoundException("Product", "productId", productId));

            // Directly update product stock and total price
            // product.setQuantity(product.getQuantity() - quantity);
            totalPrice += product.getProductDiscountedPrice()* quantity;
            // Create and save cart item
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(existingCart);
            cartItem.setQuantity(cartItemDTO.quantity());
            cartItem.setProductPrice(product.getProductPrice());
            cartItem.setDiscount(product.getProductDiscount());
            cartItem.setDiscountedPrice(product.getProductDiscountedPrice());
            cartItemRepository.save(cartItem);
        }

        // Update the cart's total price and save
        existingCart.setTotalPrice(totalPrice);
        cartRepository.save(existingCart);
        return "Cart created/updated with the new items successfully";
    }


    private Cart createCart() {

        Cart userCart = cartRepository.findCartByEmail(authUtils.getLoggedinEmail());

        if(userCart!=null){
            return userCart;
        }

        Cart cart=new Cart();
        cart.setUser(authUtils.getLoggedinUser());
        cart.setTotalPrice(0.0);
        return cartRepository.save(cart);
    }


}
