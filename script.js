async function loadXML() {
    const response = await fetch('crViewer.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
  
    // Info karyawan
    const nama = xmlDoc.querySelector('Field[Name="EMPFULLNAME1"] FormattedValue')?.textContent || "-";
    const noKaryawan = xmlDoc.querySelector('Field[Name="EMPDISPLAYNUMBER1"] FormattedValue')?.textContent || "-";
    const jabatan = xmlDoc.querySelector('Field[Name="DSGNAME3"] FormattedValue')?.textContent || "-";
    const ptkp = xmlDoc.querySelector('Field[Name="MARITALSTATUS1"] FormattedValue')?.textContent || "-";
    const tanggalMasuk = xmlDoc.querySelector('Field[Name="EMPDATEJOINED1"] FormattedValue')?.textContent || "-";
  
    document.getElementById('info-karyawan').innerHTML = `
      <p><strong>Nama:</strong> ${nama}</p>
      <p><strong>No Karyawan:</strong> ${noKaryawan}</p>
      <p><strong>Jabatan:</strong> ${jabatan}</p>
      <p><strong>PTKP Status:</strong> ${ptkp}</p>
      <p><strong>Tanggal Masuk:</strong> ${tanggalMasuk}</p>
    `;
  
    // Rincian Gaji
    const tbody = document.querySelector('#tabel-gaji tbody');
    const details = xmlDoc.querySelectorAll('Details Section Field[Name="ITEM1"]');
  
    details.forEach(itemField => {
      const desc = itemField.querySelector('FormattedValue')?.textContent || "-";
      const amountField = itemField.parentElement.querySelector('Field[Name="TRNAMOUNT1"] FormattedValue');
      const amount = amountField ? amountField.textContent : "-";
  
      const row = document.createElement('tr');
      row.innerHTML = `<td>${desc}</td><td style="text-align:right;">${amount}</td>`;
      tbody.appendChild(row);
    });
  
    // Bank Info
    const bankInfo = xmlDoc.querySelector('Subreport Field[Name="BankInfo1"] FormattedValue')?.textContent || "-";
    const bankAmount = xmlDoc.querySelector('Subreport Field[Name="EBTAMOUNT1"] FormattedValue')?.textContent || "-";
  
    document.getElementById('bank-info').innerHTML = `
      <h2>Informasi Bank</h2>
      <p><strong>Bank:</strong> ${bankInfo}</p>
      <p><strong>Jumlah Transfer:</strong> ${bankAmount}</p>
    `;
  }
  
  loadXML();
  