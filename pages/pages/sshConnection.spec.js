// ssh-connect.js
const { NodeSSH } = require('node-ssh');
const ssh = new NodeSSH();

async function connectSSH() {
  try {
    await ssh.connect({
      host: '10.45.3.1',
      username: 'support',
      // method 1: password login
      // password: 'your_password',

      // method 2: key-based login
      privateKey: '/path/to/your/private/key' // e.g., ~/.ssh/id_rsa
    });

    console.log('✅ SSH connection established');

    // Optional: run a command
    const result = await ssh.execCommand('whoami');
    console.log('Command output:', result.stdout);

    ssh.dispose();
  } catch (err) {
    console.error('❌ SSH connection failed:', err);
  }
}


