import React from 'react'

function CtaSection() {
  return (
    <div class="w-full flex justify-center mt-16">
    <div class="bg-gray-800 relative rounded-2xl -mx-4 p-8 space-y-8 max-w-4xl text-center">
        <div class="space-y-4">
            <h2 class="text-white font-heading font-bold text-2xl">
                Title of card
            </h2>

            <p class="text-xl text-white">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                deserunt mollit anim id est laborum.
            </p>
        </div>

        <a class="inline-flex items-center justify-center font-medium tracking-tight rounded-lg border transition hover:scale-105 hover:-rotate-1 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-inset h-11 px-4 text-lg text-white shadow focus:ring-white border-transparent bg-yellow-500 hover:bg-yellow-400 focus:bg-yellow-600 focus:ring-offset-yellow-600"
            href="#">
            <span>Check out our plugins →</span>
        </a>
    </div>
</div>
  )
}

export default CtaSection