## Klaster z wykorzystaniem volumes (Kubernetes)
### Co nowego
1. PersistentVolume
Zasób pozwalający na lokalne przechowywanie danych. Niezależnie od stanu POD'a wartości są przechowywane w systemie plików.
2. PersistentVolumeClaim
Wymagane do użycia PersistentVolume. Określa jaki PV jest wymagany oraz parametry takie jak rozmiar woluminu. Następnie wiąże ze wskazanym POD (w tym przypadku z Postgres)
3. Volumes dla Postgresa
Wykorzystanie volumes przy Deployment Postgres pozwala na zachowanie danych lokalnie. Dla testów wykorzystano prosty POD generujący losowe liczby. Zapisywane dane można znaleźć (jeżeli używamy minikube) w kontenerze minikube we wskazanym katalogu.