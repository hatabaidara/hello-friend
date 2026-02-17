package com.tonsite.controller;

import com.tonsite.dto.MemberRegisterRequest;
import com.tonsite.dto.MemberResponse;
import com.tonsite.dto.MemberWithScoreResponse;
import com.tonsite.model.Role;
import com.tonsite.service.MemberAiService;
import com.tonsite.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberAiService memberAiService;

    public MemberController(MemberService memberService, MemberAiService memberAiService) {
        this.memberService = memberService;
        this.memberAiService = memberAiService;
    }

    @PostMapping("/register")
    public MemberResponse registerMember(@Valid @RequestBody MemberRegisterRequest request) {
        return memberService.registerMember(request);
    }

    @GetMapping
    public Page<MemberResponse> getMembers(@RequestParam Optional<String> search,
                                           @RequestParam Optional<Role> role,
                                           @RequestParam Optional<String> ville,
                                           Pageable pageable) {
        return memberService.getFilteredMembers(search, role, ville, pageable);
    }

    @GetMapping("/with-scores")
    public Page<MemberWithScoreResponse> getMembersWithScores(@RequestParam Optional<String> search,
                                                              @RequestParam Optional<Role> role,
                                                              @RequestParam Optional<String> ville,
                                                              Pageable pageable) {
        return memberService.getFilteredMembersWithScores(search, role, ville, pageable);
    }

    @GetMapping(value = "/export/csv", produces = "text/csv")
    public ResponseEntity<byte[]> exportMembersCsv(@RequestParam Optional<String> search,
                                                   @RequestParam Optional<Role> role,
                                                   @RequestParam Optional<String> ville) {
        List<MemberResponse> members = memberService.getFilteredMembersForExport(search, role, ville);

        StringBuilder csv = new StringBuilder();
        csv.append("id,nom,email,telephone,ville,role\n");
        for (MemberResponse m : members) {
            csv.append(m.getId() == null ? "" : m.getId()).append(',')
                    .append(escapeCsv(m.getNom())).append(',')
                    .append(escapeCsv(m.getEmail())).append(',')
                    .append(escapeCsv(m.getTelephone())).append(',')
                    .append(escapeCsv(m.getVille())).append(',')
                    .append(m.getRole() == null ? "" : m.getRole().name())
                    .append('\n');
        }

        byte[] body = csv.toString().getBytes(StandardCharsets.UTF_8);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=members.csv")
                .contentType(new MediaType("text", "csv", StandardCharsets.UTF_8))
                .body(body);
    }

    @GetMapping(value = "/export/json", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<MemberResponse>> exportMembersJson(@RequestParam Optional<String> search,
                                                                  @RequestParam Optional<Role> role,
                                                                  @RequestParam Optional<String> ville) {
        List<MemberResponse> members = memberService.getFilteredMembersForExport(search, role, ville);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=members.json")
                .body(members);
    }

    @PostMapping("/scores/recalculate")
    public ResponseEntity<Void> recalculateScores() {
        memberAiService.recalculateAll();
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{email}")
    public MemberResponse getMemberByEmail(@PathVariable String email) {
        return memberService.getMemberByEmail(email);
    }

    private String escapeCsv(String value) {
        if (value == null) {
            return "";
        }
        boolean mustQuote = value.contains(",") || value.contains("\"") || value.contains("\n") || value.contains("\r");
        String escaped = value.replace("\"", "\"\"");
        return mustQuote ? "\"" + escaped + "\"" : escaped;
    }
}
