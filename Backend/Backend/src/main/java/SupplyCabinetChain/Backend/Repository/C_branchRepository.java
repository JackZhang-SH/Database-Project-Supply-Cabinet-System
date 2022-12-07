package SupplyCabinetChain.Backend.Repository;

import SupplyCabinetChain.Backend.entity.c_branch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface C_branchRepository extends JpaRepository<c_branch, Integer> {

    //    fina user by id
    @Query(
            value = "SELECT * FROM c_branch WHERE C_user_id=?1 AND C_branch_id = ?2",
            nativeQuery = true)
    Optional<c_branch> findCbranchById(int C_user_id, int C_branch_id);
    @Query(
            value = "SELECT * FROM c_branch WHERE C_user_id=?1",
            nativeQuery = true)
    List<c_branch> findAllCbranchByUserId(int C_user_id);

//    @Query(
//            value = "UPDATE user SET user.user_password=?2 WHERE user.user_id=?1",
//            nativeQuery = true)
//    Optional<user> updatePasswordById(int id, String password);
}
