import { useEffect } from "react";
import { VscGithub } from "react-icons/vsc";
import { useAuth } from "../../hooks/Auth";
import { api } from "../../services/api";
import styles from "./styles.module.scss";


export const LoginBox = () => {
  const { signIn, signInUrl } = useAuth();

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');
    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');
      window.history.pushState({}, '', urlWithoutCode);

      signIn(githubCode);
    }
  }, []);

  return <div className={styles.loginBoxWrapper}>
    <strong>Entre e compartilhle sua mensagem</strong>
    <a href={signInUrl} className={styles.signInWithGithub}>
      <VscGithub size="24" />
      Entrar com o Github
    </a>
  </div>;
}
