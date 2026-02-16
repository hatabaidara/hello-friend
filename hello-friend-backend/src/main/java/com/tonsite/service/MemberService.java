package com.tonsite.service;

import com.tonsite.dto.MemberRegisterRequest;
import com.tonsite.dto.MemberResponse;
import com.tonsite.exception.ResourceNotFoundException;
import com.tonsite.model.Member;
import com.tonsite.model.Role;
import com.tonsite.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public MemberResponse registerMember(MemberRegisterRequest request) {
        if (memberRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email deja utilise");
        }

        Member member = new Member();
        member.setNom(request.getNom());
        member.setEmail(request.getEmail());
        member.setTelephone(request.getTelephone());
        member.setVille(request.getVille());
        member.setRole(request.getRole() == null ? Role.MEMBRE : request.getRole());
        member.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));

        Member saved = memberRepository.save(member);
        return toResponse(saved);
    }

    public List<MemberResponse> getAllMembers() {
        return memberRepository.findAll().stream().map(this::toResponse).toList();
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
                member.getRole()
        );
    }
}
