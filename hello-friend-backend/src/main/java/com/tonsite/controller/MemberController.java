package com.tonsite.controller;

import com.tonsite.dto.MemberRegisterRequest;
import com.tonsite.dto.MemberResponse;
import com.tonsite.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/register")
    public MemberResponse registerMember(@Valid @RequestBody MemberRegisterRequest request) {
        return memberService.registerMember(request);
    }

    @GetMapping
    public List<MemberResponse> getAllMembers() {
        return memberService.getAllMembers();
    }

    @GetMapping("/{email}")
    public MemberResponse getMemberByEmail(@PathVariable String email) {
        return memberService.getMemberByEmail(email);
    }
}
