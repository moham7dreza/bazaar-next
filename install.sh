sudo chmod -R 777 .
sudo chown $USER:$USER .
sudo cp .env.example .env
npm install
npm run dev