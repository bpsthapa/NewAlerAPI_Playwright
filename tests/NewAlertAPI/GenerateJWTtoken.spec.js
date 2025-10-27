const { test, expect } = require('@playwright/test');
const { NodeSSH } = require('node-ssh');

const jwtPath = './testFiles/token_generator.py';  //locat file path destination
const remotePath = '/tmp/token_generator.py';      //Remote destination

test('SSH connection and SCP upload', async () => {
  const ssh = new NodeSSH();

  try {
    await ssh.connect({
      host: '10.45.3.139',
      username: 'support',
      password: 'inshbdK0sh!=1',  // ensure it's correct
    });

    console.log('✅ SSH connected');

    // ✅ SCP file upload
    await ssh.putFile(jwtPath, remotePath);
    console.log(`📤 File uploaded to ${remotePath}`);

    // ✅ Run command
    const result = await ssh.execCommand('cat /opt/immune/etc/vers');
    const versionOutput = result.stdout.trim();

    console.log('📄 Version Output:', versionOutput);
    expect(versionOutput).not.toBe('');

  } catch (error) {
    console.error('❌ SSH Error:', error);
    throw error;
  } finally {
    ssh.dispose();
  }
});

//python3 token_generator.py --sub=admin --secret=758163192b2d590399bcddf076f3b9bb --scope="user:read alertrules:read search:read logsource:read"
//python3 token_generator.py --sub=admin --secret=758163192b2d590399bcddf076f3b9bb --scope="user:write alertrules:write search:write logsource:write"
