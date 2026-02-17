package com.tonsite.repository;

import com.tonsite.model.MemberAiScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface MemberAiScoreRepository extends JpaRepository<MemberAiScore, Long> {
    Optional<MemberAiScore> findByMemberId(Long memberId);

    List<MemberAiScore> findByMemberIdIn(Collection<Long> memberIds);
}
