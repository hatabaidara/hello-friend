package com.tonsite.config;

import com.tonsite.model.Member;
import com.tonsite.repository.MemberRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;

@Component
public class LastActivityUpdateFilter extends OncePerRequestFilter {

    private static final Duration UPDATE_INTERVAL = Duration.ofMinutes(5);

    private final MemberRepository memberRepository;

    public LastActivityUpdateFilter(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null
                && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken)) {
            String email = authentication.getName();

            memberRepository.findByEmail(email).ifPresent(member -> updateLastActivityIfNeeded(member));
        }

        filterChain.doFilter(request, response);
    }

    private void updateLastActivityIfNeeded(Member member) {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime last = member.getLastActivityAt();

        if (last == null || Duration.between(last, now).compareTo(UPDATE_INTERVAL) >= 0) {
            member.setLastActivityAt(now);
            memberRepository.save(member);
        }
    }
}
