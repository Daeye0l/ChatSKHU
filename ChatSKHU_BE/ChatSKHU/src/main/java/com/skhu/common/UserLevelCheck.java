package com.skhu.common;

import com.skhu.oauth.domain.UserRole;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Retention(RUNTIME)
@Target(METHOD)
public @interface UserLevelCheck {
    UserRole level() default UserRole.ROLE_UNAUTH;
}