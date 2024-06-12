# Firebase setup
- Create both (at `Build` category)
  - Storage
  - Realtime Database   

![image](https://github.com/lcaohoanq/Javascript-Issues/assets/136492579/c7d31072-f030-4a0d-8301-a93feb7a3c69)

# Code setup
- Create `.env` at root, the data will contain these value:
```typescript
export default {
  firebaseConfig: {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  },
};
```
# Test

```bash
npx ts-node src/server.ts
```

- key: filename
- value: ...
![image](https://github.com/lcaohoanq/Javascript-Issues/assets/136492579/1369ef70-3ba8-4aef-b92a-ce0f83011b14)
