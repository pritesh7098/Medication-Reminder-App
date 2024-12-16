// src/pages/Register.tsx
import { 
    IonContent, 
    IonPage, 
    IonItem, 
    IonLabel, 
    IonInput, 
    IonButton, 
    IonCard, 
    IonCardContent 
  } from '@ionic/react';
  import { useState } from 'react';
  import { useHistory } from 'react-router';
  
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
              // Store the token if needed
              localStorage.setItem('token', data.token);
              // Redirect to login
              history.push('/login');
          } else {
              console.error('Registration failed:', data.message);
              // Handle error (show message to user)
          }
      } catch (error) {
          console.error('Registration error:', error);
          // Handle network errors
      }
  };
  
    return (
      <IonPage>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <form onSubmit={handleRegister}>
                <IonItem>
                  <IonLabel position="floating">Name</IonLabel>
                  <IonInput 
                    type="text" 
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
  
                <IonButton 
                  expand="block" 
                  type="submit" 
                  className="ion-margin-top"
                >
                  Register
                </IonButton>
  
                <IonButton 
                  expand="block" 
                  fill="clear" 
                  onClick={() => history.push('/login')}
                >
                  Already have an account? Login
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default Register;
  