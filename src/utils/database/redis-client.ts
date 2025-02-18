import * as Redis from 'redis';

export const BlackList = Redis.createClient();
BlackList.on('connect', () => {
  console.log('redis running on : localhost');
});
BlackList.on('error', (err) => {
  console.error(`Error: ${err}`);
  console.log(err)
});
const initBlackListClient = async () => {
  try {
    await BlackList.connect();
    console.log('Black list client connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default initBlackListClient;
