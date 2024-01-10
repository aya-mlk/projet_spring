package com.mundiapolis.digital_banking.repositories;

import com.mundiapolis.digital_banking.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {
    List<BankAccount> getBankAccountByCustomer_Id(Long customerId);

}
