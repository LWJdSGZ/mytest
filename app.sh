envApp=${1}
echo "envApp full path [ ${envApp}]"
cd /jenkins/home/workspace/${envApp}
echo "================================"
pwd
echo "================================"

rm -rf node_modules dist
cnpm install
npm run build