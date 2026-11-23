// FUNGSI BUKA UNDANGAN
function openInvitation() {
document.getElementById("cover").style.display = "none";
document.getElementById("main-invitation").style.display = "flex";

mulaiCountdown();

}

// COUNTDOWN
function mulaiCountdown() {
const tanggalAcara = new Date("February 25, 2027 19:00:00").getTime();

function updateCountdown() {
    const sekarang = new Date().getTime();
    const selisih = tanggalAcara - sekarang;

    if (selisih <= 0) {
        document.getElementById("hari").textContent = "0";
        document.getElementById("jam").textContent = "0";
        document.getElementById("menit").textContent = "0";
        document.getElementById("detik").textContent = "0";
        return;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor((selisih / (1000 * 60 * 60)) % 24);
    const menit = Math.floor((selisih / (1000 * 60)) % 60);
    const detik = Math.floor((selisih / 1000) % 60);

    document.getElementById("hari").textContent = hari;
    document.getElementById("jam").textContent = jam;
    document.getElementById("menit").textContent = menit;
    document.getElementById("detik").textContent = detik;
}

updateCountdown();
setInterval(updateCountdown, 1000);

}

// NAMA TAMU OTOMATIS
const urlParams = new URLSearchParams(window.location.search);
const namaTamu = urlParams.get("to");

if (namaTamu) {
const namaElement = document.getElementById("nama-tamu-cover");

if (namaElement) {
    namaElement.textContent = namaTamu;
}

}

// BUKU TAMU
const guestForm = document.getElementById("guest-form");
const guestList = document.getElementById("guest-list");

if (guestForm && guestList) {

// Menampilkan data tersimpan
let daftarTamu = JSON.parse(localStorage.getItem("daftarTamu")) || [];

function tampilkanTamu() {
    guestList.innerHTML = "";

    daftarTamu.forEach(function(tamu) {
        const item = document.createElement("div");

        item.innerHTML = `
            <strong>${tamu.nama}</strong>
            <p>${tamu.status}</p>
            <p>${tamu.pesan}</p>
        `;

        guestList.appendChild(item);
    });
}

tampilkanTamu();

// Menyimpan data tamu
guestForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nama = document.getElementById("guest-name").value;
    const status = document.getElementById("guest-status").value;
    const pesan = document.getElementById("guest-message").value;

    const tamuBaru = {
        nama: nama,
        status: status,
        pesan: pesan
    };

    daftarTamu.push(tamuBaru);

    localStorage.setItem("daftarTamu", JSON.stringify(daftarTamu));

    tampilkanTamu();

    guestForm.reset();

    alert("Terima kasih sudah mengisi buku tamu!");
});

}

// MUSIK UNDANGAN
function toggleMusik() {
    const musik = document.getElementById("musik");
    const tombol = document.getElementById("tombol-musik");

    if (musik.paused) {
        musik.play();
        tombol.textContent = "Pause Musik";
    } else {
        musik.pause();
        tombol.textContent = "Play Musik";
    }
}