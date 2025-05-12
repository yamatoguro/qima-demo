package com.qima.demo.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	// @Bean
	// public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
	// CorsConfiguration configuration = new CorsConfiguration();
	// configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
	// configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE",
	// "OPTIONS"));
	// UrlBasedCorsConfigurationSource source = new
	// UrlBasedCorsConfigurationSource();
	// source.registerCorsConfiguration("/**", configuration);
	// http.cors(cors -> cors
	// .configurationSource(source))
	// .csrf(AbstractHttpConfigurer::disable)
	// .authorizeHttpRequests(requests -> requests
	// .requestMatchers("/v2/api-docs", "/swagger-resources/**",
	// "/swagger-ui/**").permitAll())
	// .authorizeHttpRequests(
	// authorizationManagerRequestMatcherRegistry ->
	// authorizationManagerRequestMatcherRegistry
	// .requestMatchers("/**").authenticated())
	// .httpBasic(Customizer.withDefaults())
	// .sessionManagement(
	// httpSecuritySessionManagementConfigurer ->
	// httpSecuritySessionManagementConfigurer
	// .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
	// .addFilterBefore(new AuthenticationFilter(),
	// UsernamePasswordAuthenticationFilter.class);
	// return http.build();
	// }

	@Bean
	public WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring()
				.requestMatchers("/**");
	}

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.cors(Customizer.withDefaults()).csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.requestMatchers("/categoria/**", "/produto/**").hasRole("USER").anyRequest().permitAll())
				.httpBasic(Customizer.withDefaults())
				.formLogin(Customizer.withDefaults());
		;
		return http.build();
	}

	@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:8080", "http://localhost:4200"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

	@Bean
	public UserDetailsService userDetailsService() {
		UserDetails user = User.withDefaultPasswordEncoder()
				.username("user")
				.password("password")
				.roles("USER")
				.build();
		UserDetails admin = User.withDefaultPasswordEncoder()
				.username("admin")
				.password("password")
				.roles("ADMIN", "USER")
				.build();
		return new InMemoryUserDetailsManager(user, admin);
	}
}