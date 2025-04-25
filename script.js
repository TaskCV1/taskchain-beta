let provider;
let signer;

window.addEventListener('DOMContentLoaded', async () => {
  const connectBtn = document.getElementById('connectWallet');
  const modeToggle = document.getElementById('themeToggle');
  const navButtons = document.querySelectorAll('.nav-btn');
  const mainContent = document.getElementById('mainContent');

  // Wallet connect
  connectBtn.addEventListener('click', async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        const address = await signer.getAddress();
        connectBtn.textContent = address.slice(0, 6) + '...' + address.slice(-4);
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    } else {
      alert('Please install MetaMask to use this feature.');
    }
  });

  // Mode switch
  modeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');
    modeToggle.textContent = document.body.classList.contains('light-mode')
      ? 'Dark Mode' : 'Light Mode';
  });

  // Navigation logic
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.getAttribute('data-section');
      mainContent.innerHTML = `
        <div class="text-gray-300">
          <h2 class="text-xl font-semibold text-purple-400 mb-2 capitalize">${section} section</h2>
          <p>This section is under construction. Content will appear here soon.</p>
        </div>
      `;
    });
  });
});
