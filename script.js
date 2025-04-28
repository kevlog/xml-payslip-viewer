document.getElementById('xmlFile').addEventListener('change', function (event) {
   const file = event.target.files[0];
   if (!file) return;

   const reader = new FileReader();
   reader.onload = function (e) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(e.target.result, 'application/xml');
      const details = xmlDoc.querySelectorAll('Details Section Field[Name="ITEM1"]');
      const output = document.getElementById('output');
      const tableBody = document.getElementById('table-body');

      tableBody.innerHTML = '';

      details.forEach((detail) => {
         const itemName = detail.querySelector('FormattedValue')?.textContent.trim() || '-';
         const amountField = detail.parentElement.querySelector('Field[Name="TRNAMOUNT1"] FormattedValue');
         const amount = amountField ? amountField.textContent.trim() : '0';

         const row = `
            <tr class="hover:bg-blue-100 transition-colors">
            <td>${itemName}</td>
            <td class="text-right">${amount}</td>
            </tr>`;

         tableBody.insertAdjacentHTML('beforeend', row);
      });

      output.classList.remove('hidden');
   };
   reader.readAsText(file);
});
