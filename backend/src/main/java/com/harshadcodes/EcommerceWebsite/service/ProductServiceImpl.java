package com.harshadcodes.EcommerceWebsite.service;

import com.harshadcodes.EcommerceWebsite.constants.AppRole;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceAlreadyExistException;
import com.harshadcodes.EcommerceWebsite.exceptions.ResourceNotFoundException;
import com.harshadcodes.EcommerceWebsite.model.Cart;
import com.harshadcodes.EcommerceWebsite.model.Category;
import com.harshadcodes.EcommerceWebsite.model.Product;
import com.harshadcodes.EcommerceWebsite.model.User;
import com.harshadcodes.EcommerceWebsite.payload.CartDTO;
import com.harshadcodes.EcommerceWebsite.payload.CloudinaryImageResponse;
import com.harshadcodes.EcommerceWebsite.payload.ProductDTO;
import com.harshadcodes.EcommerceWebsite.payload.ProductResponse;
import com.harshadcodes.EcommerceWebsite.repositories.CartRepository;
import com.harshadcodes.EcommerceWebsite.repositories.CategoryRepository;
import com.harshadcodes.EcommerceWebsite.repositories.ProductRepository;
import com.harshadcodes.EcommerceWebsite.utils.AuthUtils;
import com.harshadcodes.EcommerceWebsite.utils.PaginationUtility;
import com.harshadcodes.EcommerceWebsite.utils.specifications.ProductSpecifications;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{

    private  final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;
    private final FilesService filesService;

    private final CartService cartService;
    private final CartRepository cartRepository;
    private final AuthUtils authUtils;

    @Override
    public ProductDTO saveProduct(ProductDTO productDTO, Long categoryId) {
        Category category= categoryRepository.findById(categoryId).orElseThrow(
                ()->new ResourceNotFoundException("Category","CategoryId",categoryId)
        );
        User user =authUtils.getLoggedinUser();

        Product  product = modelMapper.map(productDTO, Product.class);
        product.setUser(user);
        if(productRepository.existsByProductNameAndCategory_CategoryIdAndUser_id(product.getProductName(),category.getCategoryId(),user.getId())){
            throw new ResourceAlreadyExistException("Product","ProductName and Category ",product.getProductName()+" - "+category.getCategoryName());
        }
        product.setCategory(category);
        Product savedProduct=productRepository.save(product);
        ProductDTO savedProductDTO=modelMapper.map(savedProduct, ProductDTO.class);
        savedProductDTO.setProductDiscountedPrice(savedProduct.getProductDiscountedPrice());
        return savedProductDTO;
    }

    public ProductResponse getAllProductsForPublic(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category) {

        Pageable pageDetails= PaginationUtility.createPageable(pageNumber,pageSize,sortBy,sortOrder);
        Specification<Product> spec=Specification.unrestricted();

        if(keyword!=null && !keyword.isEmpty()){
            keyword = keyword
                    .replaceAll("[^a-zA-Z0-9 ]", "")
                    .toLowerCase()
                    .trim();
            String[] words = keyword.split("\\s+");
            for(String word:words){
                if(!word.isEmpty()) {
                    spec = spec.and(ProductSpecifications.productSpecificationByName(word));
                }
            }
        }
        if(category!=null && !category.isEmpty()){
            spec=  spec.and(ProductSpecifications.productSpecificationByCategory(category));
        }
        Page<Product> productPage;
        if (spec == null) {
            productPage = productRepository.findAll(pageDetails);
        } else {
            productPage = productRepository.findAll(spec, pageDetails);
        }
        return buildProductResponse(productPage);
    }


    @Override
    public ProductResponse getAllProductsForAdminAndSeller(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder, String keyword, String category) {

        User user = authUtils.getLoggedinUser();
        boolean hasSellerRole = authUtils.hasRole(user,AppRole.ROLE_SELLER);

        boolean hasAdminRole = authUtils.hasRole(user,AppRole.ROLE_ADMIN);
        boolean isOnlySeller = hasSellerRole && !hasAdminRole;
        Pageable pageDetails= PaginationUtility.createPageable(pageNumber,pageSize,sortBy,sortOrder);
        Specification<Product> spec=Specification.unrestricted();

        if(keyword!=null && !keyword.isEmpty()){
            keyword = keyword
                    .replaceAll("[^a-zA-Z0-9 ]", "")
                    .toLowerCase()
                    .trim();
            String[] words = keyword.split("\\s+");
            for(String word:words){
                if(!word.isEmpty()) {
                    spec = spec.and(ProductSpecifications.productSpecificationByName(word));
                }
            }
        }
        if(category!=null && !category.isEmpty()){
          spec=  spec.and(ProductSpecifications.productSpecificationByCategory(category));
        }

        if(isOnlySeller){
            spec= spec.and(ProductSpecifications.productSpecificationForSeller(user.getId()));
        }
        Page<Product> productPage;
        if (spec == null) {
            productPage = productRepository.findAll(pageDetails);
        } else {
            productPage = productRepository.findAll(spec, pageDetails);
        }
        return buildProductResponse(productPage);
    }

   /* @Override
    public ProductResponse getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        categoryRepository.findById(categoryId).orElseThrow(() ->
                        new ResourceNotFoundException("Category", "CategoryId", categoryId));

        Pageable pageable = PaginationUtility.createPageable(pageNumber, pageSize, sortBy, sortOrder);

        Page<Product> productPage = productRepository.findByCategory_CategoryId(categoryId, pageable);


        return buildProductResponse(productPage);
    }
*/
   /* @Override
    public ProductResponse getProductsByKeywords(String keywords,Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {

        Pageable pageable=PaginationUtility.createPageable(pageNumber,pageSize,sortBy,sortOrder);
        Page<Product> productPage =productRepository.findByProductNameContainingIgnoreCase(keywords,pageable );
        return buildProductResponse(productPage);
    }*/

    @Override
    public ProductDTO updateProduct(Long productId, ProductDTO productDTO) {
        Product product=productRepository.findById(productId).orElseThrow(()->new ResourceNotFoundException("Product","ProductId",productId));

        User user = authUtils.getLoggedinUser();
        boolean isAdmin = authUtils.hasRole(user, AppRole.ROLE_ADMIN);

        if (!isAdmin && !product.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You can only update your own products.");
        }

        product.setProductName(productDTO.getProductName());
        product.setProductDescription(productDTO.getProductDescription());
       // product.setProductImage(productDTO.getProductImage());
        product.setProductQuantity(productDTO.getProductQuantity());
        product.setProductPrice(productDTO.getProductPrice());
        product.setProductDiscount(productDTO.getProductDiscount());
        productRepository.save(product);

        List<Cart> carts=cartRepository.findCartsByProductId(productId);

        List<CartDTO> cartDTOS=carts.stream().map(cart->{
            CartDTO cartDTO=modelMapper.map(cart,CartDTO.class);

            List<ProductDTO> productDTOS=cart.getCartItems()
                    .stream().map(cartProduct->modelMapper.map(cartProduct,ProductDTO.class))
                    .collect(Collectors.toList());

            cartDTO.setProductDTOs(productDTOS);
            return cartDTO;

        }).collect(Collectors.toList());

        cartDTOS.forEach(cartDTO -> {
            try {
                cartService.updateProductInSideCart(productId,cartDTO.getCartId());
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        });

        ProductDTO savedProductDTO=modelMapper.map(product, ProductDTO.class);
        savedProductDTO.setProductPrice(product.getProductPrice());
        savedProductDTO.setProductDiscount(product.getProductDiscount());
        savedProductDTO.setProductDiscountedPrice(product.getProductDiscountedPrice());
        return savedProductDTO;
    }

    @Override
    public ProductDTO deleteProduct(Long productId) {
        Product product=productRepository.findById(productId).orElseThrow(()->new ResourceNotFoundException("Product","ProductId",productId));
        User user = authUtils.getLoggedinUser();
        boolean isAdmin = authUtils.hasRole(user, AppRole.ROLE_ADMIN);

        if (!isAdmin && !product.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You can only delete your own products.");
        }

        List<Cart>carts=cartRepository.findCartsByProductId(productId);
        carts.forEach(cart -> cartService.deleteCartItem(productId,cart.getCartId()));
        productRepository.delete(product);

        ProductDTO productDTO=modelMapper.map(product, ProductDTO.class);
        productDTO.setProductDiscountedPrice(product.getProductDiscountedPrice());
        return productDTO;
    }

    @Override
    public ProductDTO uploadFiles(Long productId, MultipartFile file) throws IOException {
        Product productFromDb=productRepository.findById(productId).orElseThrow(
                ()->new ResourceNotFoundException("Product","ProductId",productId)
        );
        User user = authUtils.getLoggedinUser();
        boolean isAdmin = authUtils.hasRole(user, AppRole.ROLE_ADMIN);

        if (!isAdmin && !productFromDb.getUser().getId().equals(user.getId())) {
            throw new AccessDeniedException("You can only update your own products.");
        }

        if(productFromDb.getProductImagePublicId()!=null){
            filesService.deleteImage(productFromDb.getProductImagePublicId());
        }

        CloudinaryImageResponse uploadedImage = filesService.uploadImage(file);
        productFromDb.setProductImage(uploadedImage.imageUrl());
        productFromDb.setProductImagePublicId(uploadedImage.publicId());

        Product savedProduct=productRepository.save(productFromDb);
        return modelMapper.map(savedProduct,ProductDTO.class);
    }

    @Override
    public List<ProductDTO> getProductsByIds(List<Long> productIds) {
        List<Product> products = productRepository.findAllById(productIds);
        return products.stream()
                .map(product -> modelMapper.map(product, ProductDTO.class))
                .toList();
    }

    private   ProductResponse buildProductResponse(Page<Product> productPage) {
        List<ProductDTO> productDTOS = productPage.getContent().stream().map(product ->
        {
            ProductDTO dto = modelMapper.map(product, ProductDTO.class);
             dto.setProductDiscountedPrice(product.getProductDiscountedPrice());
            return dto;
        }).toList();
        return new ProductResponse(
                productDTOS,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isLast());
    }

}
