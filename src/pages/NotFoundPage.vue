<template>
  <section
    class="min-h-screen flex flex-col items-center justify-center text-center"
  >
    <div
      class="p-10 rounded-2xl bg-gray-800/60 backdrop-blur-lg shadow-card max-w-md"
    >
      <h1 class="text-6xl font-extrabold text-brand mb-4">404</h1>
      <p class="text-gray-300 text-lg mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <RouterLink
        to="/"
        class="inline-block bg-brand hover:bg-brand-dark text-white font-medium px-6 py-3 rounded-xl transition-all duration-300"
      >
        ← Back to Home
      </RouterLink>
    </div>
  </section>
</template>
