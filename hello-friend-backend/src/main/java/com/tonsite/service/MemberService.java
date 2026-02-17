package com.tonsite.service;

import com.tonsite.dto.MemberRegisterRequest;
import com.tonsite.dto.MemberResponse;
import com.tonsite.dto.MemberWithScoreResponse;
import com.tonsite.exception.ResourceNotFoundException;
import com.tonsite.model.Member;
import com.tonsite.model.MemberAiScore;
import com.tonsite.model.Role;
import com.tonsite.repository.MemberAiScoreRepository;
import com.tonsite.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MemberAiScoreRepository memberAiScoreRepository;

    public MemberService(MemberRepository memberRepository,
                         PasswordEncoder passwordEncoder,
                         MemberAiScoreRepository memberAiScoreRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.memberAiScoreRepository = memberAiScoreRepository;
    }

    public MemberResponse registerMember(MemberRegisterRequest request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email deja utilise");
        }

        Member member = new Member();
        member.setNom(request.getNom());
        member.setEmail(request.getEmail());
        member.setTelephone(request.getTelephone() == null ? "" : request.getTelephone());
        member.setVille(request.getVille() == null ? "" : request.getVille());
        member.setRole(request.getRole() == null ? Role.MEMBRE : request.getRole());
        member.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));

        Member saved = memberRepository.save(member);
        return toResponse(saved);
    }

    public List<MemberResponse> getAllMembers() {
        return memberRepository.findAll().stream().map(this::toResponse).toList();
    }

    public Page<MemberResponse> getFilteredMembers(Optional<String> search,
                                                   Optional<Role> role,
                                                   Optional<String> ville,
                                                   Pageable pageable) {
        Specification<Member> spec = buildMemberFilterSpec(search, role, ville);
        return memberRepository.findAll(spec, pageable).map(this::toResponse);
    }

    public Page<MemberWithScoreResponse> getFilteredMembersWithScores(Optional<String> search,
                                                                      Optional<Role> role,
                                                                      Optional<String> ville,
                                                                      Pageable pageable) {
        Specification<Member> spec = buildMemberFilterSpec(search, role, ville);
        Page<Member> page = memberRepository.findAll(spec, pageable);

        List<Long> memberIds = page.getContent().stream()
                .map(Member::getId)
                .toList();

        Map<Long, MemberAiScore> scoresByMemberId = memberAiScoreRepository.findByMemberIdIn(memberIds).stream()
                .collect(Collectors.toMap(s -> s.getMember().getId(), Function.identity()));

        return page.map(member -> {
            MemberAiScore score = scoresByMemberId.get(member.getId());
            Double engagementScore = score == null ? null : score.getEngagementScore();
            String riskLevel = score == null ? null : score.getRiskLevel();
            return new MemberWithScoreResponse(
                    member.getId(),
                    member.getNom(),
                    member.getEmail(),
                    member.getTelephone(),
                    member.getVille(),
                    member.getRole(),
                    engagementScore,
                    riskLevel
            );
        });
    }

    public List<MemberResponse> getFilteredMembersForExport(Optional<String> search,
                                                           Optional<Role> role,
                                                           Optional<String> ville) {
        Specification<Member> spec = buildMemberFilterSpec(search, role, ville);
        return memberRepository.findAll(spec).stream().map(this::toResponse).toList();
    }

    private Specification<Member> buildMemberFilterSpec(Optional<String> search,
                                                        Optional<Role> role,
                                                        Optional<String> ville) {
        Specification<Member> spec = Specification.where(null);

        if (search.isPresent() && !search.get().isBlank()) {
            String q = search.get().trim().toLowerCase();
            spec = spec.and((root, query, cb) -> {
                String like = "%" + q + "%";
                return cb.or(
                        cb.like(cb.lower(root.get("nom")), like),
                        cb.like(cb.lower(root.get("email")), like),
                        cb.like(cb.lower(root.get("telephone")), like),
                        cb.like(cb.lower(root.get("ville")), like)
                );
            });
        }

        if (role.isPresent()) {
            spec = spec.and((root, query, cb) -> cb.equal(root.get("role"), role.get()));
        }

        if (ville.isPresent() && !ville.get().isBlank()) {
            String city = ville.get().trim().toLowerCase();
            spec = spec.and((root, query, cb) -> cb.equal(cb.lower(root.get("ville")), city));
        }

        return spec;
    }

    public MemberResponse getMemberByEmail(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Membre introuvable"));
        return toResponse(member);
    }

    private MemberResponse toResponse(Member member) {
        return new MemberResponse(
                member.getId(),
                member.getNom(),
                member.getEmail(),
                member.getTelephone(),
                member.getVille(),
                member.getRole(),
                member.getCreatedAt(),
                member.getLastActivityAt()
        );
    }
}
