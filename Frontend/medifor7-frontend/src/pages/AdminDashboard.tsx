// src/pages/AdminDashboard.tsx
import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonButton,
  IonSearchbar,
  useIonAlert,
  IonChip,
} from '@ionic/react';
import { format } from 'date-fns';

interface Log {
  id: number;
  user_name: string;
  medicine_name: string;
  dosage: string;
  status: string;
  acknowledged_at: string;
}

const AdminDashboard: React.FC = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      let url = 'http://localhost:3000/api/acknowledgments/all-logs';
      
      // Add query parameters if filters are set
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);
      if (searchTerm) params.append('search', searchTerm);
      
      if (params.toString()) {
        url += `?${params.toString()}`;  // Fixed template literal syntax
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Fixed template literal and added quotes
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }

      const data = await response.json();
      setLogs(data.data);
    } catch (error) {
      presentAlert({
        header: 'Error',
        message: 'Failed to fetch acknowledgment logs',
        buttons: ['OK'],
      });
    }
  };

  const handleFilter = () => {
    fetchLogs();
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSearchTerm('');
    fetchLogs();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'taken':
        return 'success';
      case 'missed':
        return 'danger';
      case 'skipped':
        return 'warning';
      default:
        return 'medium';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Admin Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="12" sizeMd="4">
                  <IonItem>
                    <IonLabel position="stacked">Start Date</IonLabel>
                    <IonDatetime
                      value={startDate}
                      onIonChange={e => setStartDate(e.detail.value!)}
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                  <IonItem>
                    <IonLabel position="stacked">End Date</IonLabel>
                    <IonDatetime
                      value={endDate}
                      onIonChange={e => setEndDate(e.detail.value!)}
                    />
                  </IonItem>
                </IonCol>
                <IonCol size="12" sizeMd="4">
                  <IonSearchbar
                    value={searchTerm}
                    onIonChange={e => setSearchTerm(e.detail.value!)}
                    placeholder="Search by patient name"
                  />
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton expand="block" onClick={handleFilter}>
                    Apply Filters
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton expand="block" color="medium" onClick={handleReset}>
                    Reset Filters
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        <IonGrid>
          {logs.map(log => (
            <IonRow key={log.id}>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                    <IonGrid>
                      <IonRow>
                        <IonCol size="12" sizeMd="3">
                          <strong>Patient:</strong> {log.user_name}
                        </IonCol>
                        <IonCol size="12" sizeMd="3">
                          <strong>Medicine:</strong> {log.medicine_name}
                        </IonCol>
                        <IonCol size="12" sizeMd="2">
                          <strong>Dosage:</strong> {log.dosage}
                        </IonCol>
                        <IonCol size="12" sizeMd="2">
                          <IonChip color={getStatusColor(log.status)}>
                            {log.status.toUpperCase()}
                          </IonChip>
                        </IonCol>
                        <IonCol size="12" sizeMd="2">
                          <strong>Time:</strong>{' '}
                          {format(new Date(log.acknowledged_at), 'PPp')}
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol> 
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default AdminDashboard;
