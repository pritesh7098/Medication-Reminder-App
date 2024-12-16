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
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { AuthService } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const { login } = useAuth();  // Use the auth context


  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email, password);  // Use the login function from context
      console.log("Login successful:", response);
      
       // Use history.replace instead of window.location
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
      <IonContent>
        <IonCard>
          <IonCardContent>
            <form onSubmit={handleLogin}>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  required
                />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  required
                />
              </IonItem>
              <IonButton
                expand="block"
                type="submit"
                className="ion-margin-top"
              >
                Login
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;
