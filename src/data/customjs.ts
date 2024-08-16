export const CUSTOMJS = `const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      isLoading: true,
      config: config,
      isOpenSidebar: false,
      activeSection: "intro",
      updatedAt: "",
      createdAt: "",
    };
  },
  created() {
    tailwind.config = {
      theme: {
        extend: {
          colors: config.theme,
        },
      },
    };

  },

  mounted() {
    window.addEventListener("scroll", this.onScroll);
    this.onScroll;
    document.title = config.name + " " + "- Documentaion";
    this.changeFavicon(config.favicon);

    const dateOpt = { day: 'numeric', month: 'long', year: 'numeric' };

    const createdAt = new Date(config?.createdAt);
    const updatedAt = new Date(config?.updatedAt);

    this.createdAt = createdAt.toLocaleDateString('en-US', dateOpt);
    this.updatedAt = updatedAt.toLocaleDateString('en-US', dateOpt);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods: {
    handleToggle() {
      this.isOpenSidebar = !this.isOpenSidebar;
    },
    onScroll() {
      const sections = document.querySelectorAll("section");
      let active = "";
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          active = section.id;
        }
      });

      this.activeSection = active;
    },

    changeFavicon(newUrl) {
      const link = document.getElementById("favicon");
      if (link) {
        link.href = newUrl;
      } else {
        const newLink = document.createElement("link");
        newLink.id = "favicon";
        newLink.rel = "icon";
        newLink.href = newUrl;
        document.head.appendChild(newLink);
      }
    },
  },
});

app.mount("#app");
`;
