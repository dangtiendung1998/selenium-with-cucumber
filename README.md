start: 
```
npm i
```
download feature: 
```
node run/downloadFeature.js
``` 
OR 
```
sh scripts/downloadFeature.sh
```
clean test-reports
```
npm run clean
```
run 1 feature: copy đường dẫn file feature muốn chạy test vào file cucumber.json tại trường `path:`
sau đó run lệnh: `npm run test`
run all feature: sửa trường `path` trong cucumber.json thành `src/features/*.feature` sau đó run lệnh `npm run test`

Lưu ý: đang chạy mặc định "parallel": 1 - tức là 1 browser
