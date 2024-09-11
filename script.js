let lastScrollY = 0;
let scheduledAnimationFrame = false;

function onScroll(evt) {
  // Simpan posisi scroll terakhir
  lastScrollY = window.scrollY;

  // Cegah multiple requestAnimationFrame
  if (scheduledAnimationFrame) return;

  // Jadwalkan pembaruan animasi
  scheduledAnimationFrame = true;

  // Meminta browser melakukan pembaruan di frame berikutnya
  requestAnimationFrame(readAndUpdatePage);
}

function readAndUpdatePage() {
  // Lakukan pembaruan berdasarkan scroll terakhir
  console.log('Current scroll position:', lastScrollY);

  // Reset flag
  scheduledAnimationFrame = false;
}

// Pasang event listener untuk scroll
window.addEventListener('scroll', onScroll);
