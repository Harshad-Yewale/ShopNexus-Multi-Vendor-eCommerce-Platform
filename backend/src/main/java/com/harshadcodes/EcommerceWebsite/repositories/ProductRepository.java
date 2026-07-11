package com.harshadcodes.EcommerceWebsite.repositories;

import com.harshadcodes.EcommerceWebsite.model.Product;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product,Long>, JpaSpecificationExecutor<Product> {

    boolean existsByProductNameAndCategory_CategoryIdAndUser_id(@NotBlank String productName, Long category_categoryId, Long user_id);

    //Page<Product> findByCategory_CategoryId(Long categoryId, Pageable pageable);

    //Page<Product> findByProductNameContainingIgnoreCase(String s, Pageable pageable);
}
