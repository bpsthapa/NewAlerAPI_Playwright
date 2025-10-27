const { test, expect } = require('@playwright/test');
const { NodeSSH } = require('node-ssh');

test('SSH connection, SCP upload, and MongoDB query', async () => {
    const key = await getSecretKey();
    console.log('Secret Key:', key);
});

async function getSecretKey() {
  const ssh = new NodeSSH();

  try {
    await ssh.connect({
      host: '10.45.3.139',
      username: 'support',
      password: 'inshbdK0sh!=1',
    });

    const mongoCommand = `echo 'inshbdK0sh!=1' | sudo -S -p '' mongosh makalu -u makalu -p 'makalu-wzkzlu-LI5' --eval "db.user.findOne({ username: 'admin' }, { secret_key: 1, _id: 0 }).secret_key"`;
    const result = await ssh.execCommand(mongoCommand);

    if (result.stderr) {
      throw new Error(`MongoDB Error: ${result.stderr.trim()}`);
    }
    
    return result.stdout.trim();
  } catch (error) {
    throw error;
  } finally {
    ssh.dispose();
  }
}
