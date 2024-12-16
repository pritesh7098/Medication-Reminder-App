// src/pages/Login.tsx
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { logInOutline, personCircleOutline } from 'ionicons/icons';
import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../context/AuthContext";
import './Auth.css';  // We'll create this shared CSS file

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
      if (response.user.role === "admin") {
        history.replace('/admin-dashboard');
      } else {
        history.replace('/dashboard');
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <IonPage>
      <IonContent className="auth-content">
        <div className="auth-container">
          <IonGrid>
            <IonRow className="ion-justify-content-center">
              <IonCol size="12" sizeMd="8" sizeLg="6">
                <IonCard className="auth-card">
                  <IonCardContent>
                    <div className="auth-header">
                      <IonIcon icon={personCircleOutline} className="auth-icon" />
                      <h1>Welcome Back</h1>
                      <p>Log in to access your medication dashboard</p>
                    </div>

                    <form onSubmit={handleLogin} className="auth-form">
                      <IonItem lines="full">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput
                          type="email"
                          value={email}
                          onIonChange={(e) => setEmail(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonItem lines="full">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                          type="password"
                          value={password}
                          onIonChange={(e) => setPassword(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonButton
                        expand="block"
                        type="submit"
                        className="auth-button"
                      >
                        Login
                        <IonIcon slot="end" icon={logInOutline} />
                      </IonButton>

                      <div className="auth-links">
                        <IonButton
                          fill="clear"
                          onClick={() => history.push('/register')}
                          className="switch-auth-btn"
                        >
                          New user? Create account
                        </IonButton>
                      </div>
                    </form>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
