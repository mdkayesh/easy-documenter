export const HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- react quill editor css -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/react-quill@2.0.0/dist/quill.snow.min.css"
    />

    <!-- tailwind js -->
    <script src="https://cdn.tailwindcss.com"></script>

    <!-- vue.js -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

    <!-- custom styles -->
    <link rel="stylesheet" href="./assets/styles/custom.css" />
    <link
      rel="shortcut icon"
      href="https://firebasestorage.googleapis.com/v0/b/md-kayesh.appspot.com/o/iconoir_hexagon.png?alt=media&token=9ab5bdcf-cd35-448b-98c1-660a10414ae7"
      type="image/x-icon"
    />
    <title>Document</title>
  </head>
  <body>
    <div id="app">
      <div class="bg-background text-textColor">
        <main>
          <!-- navbar -->
          <div
            class="fixed top-0 left-0 w-full py-5 px-6 bg-background shadow-lg md:hidden"
          >
            <div
              class="menu flex flex-col gap-1 cursor-pointer"
              @click="handleToggle"
            >
              <div class="w-7 h-0.5 bg-textColor"></div>
              <div class="w-7 h-0.5 bg-textColor"></div>
              <div class="w-7 h-0.5 bg-textColor"></div>
            </div>
          </div>
          <div class="flex">
            <!-- overlay -->
            <div
              v-if="isOpenSidebar"
              class="fixed top-0 left-0 w-full h-full bg-black/60"
              @click="handleToggle"
            ></div>
            <!-- sidebar -->
            <aside
              class="min-w-[270px] h-screen py-6 px-5 overflow-auto bg-secondary fixed md:sticky top-0 left-0 transition-all duration-500 z-50"
              :class="isOpenSidebar ? '-translate-x-0 md:translate-x-0': '-translate-x-full md:translate-x-0'"
            >
              <nav class="flex flex-col justify-between">
                <div>
                  <div
                    class="flex justify-between items-center sticky top-0 left-0"
                  >
                    <a href="#" class="flex items-center gap-3">
                      <img
                        :src="config?.logo"
                        :alt="config?.name + 'logo'"
                        class="w-12 h-12"
                      />
                      <p class="text-xl font-semibold">{{config?.name}}</p>
                    </a>
                  </div>
                  <ul class="mt-6">
                    <li>
                      <a
                        href="#intro"
                        class="block px-4 py-2 hover:text-primary transition-all duration-300 hover:bg-background"
                        :class="activeSection === 'intro' ? 'text-primary bg-background': ''"
                        @click="this.isOpenSidebar = false"
                        >Intro</a
                      >
                    </li>
                    <li v-for="item in config?.sections">
                      <a
                        :href="'#' + item.id"
                        class="block px-4 py-2 hover:text-primary transition-all duration-300 hover:bg-background"
                        :class="activeSection === item?.id ? 'text-primary bg-background': ''"
                        @click="this.isOpenSidebar = false"
                        >{{item.title}}</a
                      >
                    </li>
                  </ul>
                </div>
              </nav>
            </aside>

            <!-- sections -->

            <div class="flex-1 px-6 pb-10">
              <section id="intro" class="pt-14">
                <h1 class="text-3xl font-semibold">{{config?.name}}</h1>
                <p class="mt-2 text-xl">{{config?.subline}}</p>
                <p class="mt-6">{{config?.description}}</p>
                <div class="mt-6">
                  <ul>
                    <li><strong>Created At:</strong> {{createdAt}}</li>
                    <li>
                      <strong>Latest Update:</strong> {{updatedAt}}
                    </li>
                    <li><strong>By:</strong> {{config?.username}}</li>
                    <li>
                      <strong>Email: </strong>
                      <a
                        :href="'mailto:' + config?.email"
                        class="relative _underline hover:text-primary after:bg-primary"
                        >{{config?.email}}</a
                      >
                    </li>
                  </ul>
                </div>
              </section>
              <!-- all sections -->
              <section
                v-for="item in config?.sections"
                :key="item?.id"
                :id="item?.id"
                class="pt-14"
              >
                <h1 class="text-3xl font-semibold">{{item?.title}}</h1>
                <div class='ql-snow mt-6'>
                  <div v-html="item?.content" class="ql-editor"></div>
                </div>
              </section>

              <!-- footer -->

              <footer class="text-center pt-14 pb-8 px-10">
                This document is created only by
                <strong>Easy Documenter</strong>,
              </footer>
            </div>
          </div>
        </main>
      </div>
    </div>
    <script src="./assets/config.js"></script>
    <script src="./assets/custom.js"></script>
  </body>
</html>
`;
