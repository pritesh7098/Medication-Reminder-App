// src/pages/Register.tsx
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
} from '@ionic/react';
import { personAddOutline, personCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import './Auth.css';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('Registration successful:', data);
        localStorage.setItem('token', data.token);
        history.push('/login');
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
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
                      <h1>Create Account</h1>
                      <p>Join MediFor7 to start managing your medications</p>
                    </div>

                    <form onSubmit={handleRegister} className="auth-form">
                      <IonItem lines="full">
                        <IonLabel position="floating">Full Name</IonLabel>
                        <IonInput
                          type="text"
                          value={name}
                          onIonChange={e => setName(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonItem lines="full">
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput
                          type="email"
                          value={email}
                          onIonChange={e => setEmail(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonItem lines="full">
                        <IonLabel position="floating">Password</IonLabel>
                        <IonInput
                          type="password"
                          value={password}
                          onIonChange={e => setPassword(e.detail.value!)}
                          required
                          className="custom-input"
                        />
                      </IonItem>

                      <IonButton
                        expand="block"
                        type="submit"
                        className="auth-button"
                      >
                        Register
                        <IonIcon slot="end" icon={personAddOutline} />
                      </IonButton>

                      <div className="auth-links">
                        <IonButton
                          fill="clear"
                          onClick={() => history.push('/login')}
                          className="switch-auth-btn"
                        >
                          Already have an account? Login
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

export default Register;
