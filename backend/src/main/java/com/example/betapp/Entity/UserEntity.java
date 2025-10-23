package com.example.betapp.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @Column(nullable = false, unique = true, length = 50)
  private String username;

  @Email
  @NotBlank
  @Column(nullable = false, unique = true, length = 100)
  private String email;

  @NotBlank
  @Column(nullable = false)
  private String password;

  @Pattern(regexp = "^\\+\\d{5,15}$", message = "Phone number must include country code (e.g. +48123456789)")
  @Column(nullable = false, unique = true, length = 20)
  private String phone;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "role_id", nullable = false)
  private RoleEntity role;
}
