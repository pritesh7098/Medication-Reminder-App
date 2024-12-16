// src/pages/AdminRegister.tsx
import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  useIonAlert,
} from '@ionic/react';
import { useHistory } from 'react-router';

const AdminRegister: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminSecret, setAdminSecret] = useState('');
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/auth/register-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          adminSecret,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        presentAlert({
          header: 'Success',
          message: 'Admin registered successfully',
          buttons: ['OK'],
        });
        history.push('/login');
      } else {
        presentAlert({
          header: 'Error',
          message: data.message || 'Registration failed',
          buttons: ['OK'],
        });
      }
    } catch (error) {
      presentAlert({
        header: 'Error',
        message: 'Registration failed',
        buttons: ['OK'],
      });
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <h1 className="ion-text-center">Admin Registration</h1>
            <form onSubmit={handleRegister}>
              <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  value={name}
                  onIonChange={e => setName(e.detail.value!)}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  type="email"
                  value={email}
                  onIonChange={e => setEmail(e.detail.value!)}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  type="password"
                  value={password}
                  onIonChange={e => setPassword(e.detail.value!)}
                  required
                />
              </IonItem>

              <IonItem>
                <IonLabel position="floating">Admin Secret Key</IonLabel>
                <IonInput
                  type="password"
                  value={adminSecret}
                  onIonChange={e => setAdminSecret(e.detail.value!)}
                  required
                />
              </IonItem>

              <IonButton
                expand="block"
                type="submit"
                className="ion-margin-top"
              >
                Register as Admin
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AdminRegister;
