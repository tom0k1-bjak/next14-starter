"use client";

import React, { useEffect } from "react";
import { login } from "../../../lib/action";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  const router = useRouter();

  useEffect(() => {}, []);

  return (
    <div>
      <form className={styles.form} action={formAction}>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>
      </form>
      {state?.error}
      <Link href="/register">
        Don't have an account? an account? <b>Register</b>
      </Link>
    </div>
  );
};

export default LoginForm;
