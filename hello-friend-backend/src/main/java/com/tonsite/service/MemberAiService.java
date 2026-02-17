package com.tonsite.service;

import com.tonsite.model.Member;
import com.tonsite.model.MemberAiScore;
import com.tonsite.repository.MemberAiScoreRepository;
import com.tonsite.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class MemberAiService {

    private final MemberRepository memberRepository;
    private final MemberAiScoreRepository memberAiScoreRepository;

    public MemberAiService(MemberRepository memberRepository, MemberAiScoreRepository memberAiScoreRepository) {
        this.memberRepository = memberRepository;
        this.memberAiScoreRepository = memberAiScoreRepository;
    }

    public double calculateEngagementScore(Member member) {
        LocalDateTime reference = member.getLastActivityAt();
        if (reference == null) {
            reference = member.getCreatedAt();
        }
        if (reference == null) {
            return 0.0;
        }

        long daysInactive = ChronoUnit.DAYS.between(reference, LocalDateTime.now());
        double score = 100.0 - (daysInactive * 2.0);
        if (score < 0.0) {
            score = 0.0;
        }
        if (score > 100.0) {
            score = 100.0;
        }
        return score;
    }

    public String riskLevelFromScore(double score) {
        if (score > 80) {
            return "TRES_ACTIF";
        }
        if (score >= 50) {
            return "ACTIF";
        }
        if (score >= 20) {
            return "MOYEN";
        }
        return "A_RISQUE";
    }

    @Transactional
    public void recalculateAll() {
        List<Member> members = memberRepository.findAll();
        for (Member member : members) {
            recalculateForMember(member);
        }
    }

    @Transactional
    public MemberAiScore recalculateForMember(Member member) {
        double score = calculateEngagementScore(member);
        String riskLevel = riskLevelFromScore(score);

        MemberAiScore aiScore = memberAiScoreRepository.findByMemberId(member.getId()).orElseGet(MemberAiScore::new);
        aiScore.setMember(member);
        aiScore.setEngagementScore(score);
        aiScore.setRiskLevel(riskLevel);
        aiScore.setLastCalculatedAt(LocalDateTime.now());
        return memberAiScoreRepository.save(aiScore);
    }
}
