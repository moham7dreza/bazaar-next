sudo chown -R $USER:www-data .
sudo find . -type f -exec chmod 664 {} \;
sudo find . -type d -exec chmod 775 {} \;
sudo chmod 744 fix-permissions.sh
