package com.harshadcodes.EcommerceWebsite.repositories;

import com.harshadcodes.EcommerceWebsite.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository  extends JpaRepository<Address,Long> {
}
