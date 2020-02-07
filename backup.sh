DATABASE="test_db"
HOST="127.0.0.1"
# Database port
PORT="27017"
# Backup directory
DIR="backups/$DATABASE"
# Database user name
USERNAME="root"
# Database password
PASSWORD="passw0rd"

TIMESTAMP=`date +%F-%H%M`
BACKUP_NAME="$DATABASE-$TIMESTAMP"

mkdir -p BACKUP_NAME

mongodump --db $DATABASE --username $USERNAME --password $PASSWORD --out BACKUP_NAME