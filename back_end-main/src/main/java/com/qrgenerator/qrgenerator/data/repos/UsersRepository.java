package com.qrgenerator.qrgenerator.data.repos;

import com.qrgenerator.qrgenerator.data.entities.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Users,Integer> {
    boolean existsByPanCard(String panCard);
}
