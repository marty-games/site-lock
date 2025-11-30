(() => {
      const originalWindowOpen = window.open;
      const blockedDomainsMap = {
        'geometrylite.io': 'dashmetry.github.io',
        'geometrydashlite.io': 'dashmetry.github.io',
        '1games.io': 'dashmetry.github.io',
        'dashmetry.io': 'dashmetry.github.io',
        'geometrydashlite.online': 'dashmetry.github.io',
        'poki.com': 'dashmetry.github.io',
        '2playergames.gitlab.io': 'dc.gg/martin',
        'dressupgames.gitlab.io': 'dc.gg/martin',
        'discord.gg': 'dc.gg/martin'
      };

      window.open = function (url, ...args) {
        try {
          const domain = new URL(url).hostname;
          if (blockedDomainsMap[domain]) {
            return originalWindowOpen.call(window, blockedDomainsMap[domain], ...args);
          }
        } catch {}
        return originalWindowOpen.call(window, url, ...args);
      };

      if (window.Application?.OpenURL) {
        const originalOpenURL = window.Application.OpenURL;
        window.Application.OpenURL = function (url) {
          try {
            const domain = new URL(url).hostname;
            if (blockedDomainsMap[domain]) {
              return originalOpenURL.call(window.Application, blockedDomainsMap[domain]);
            }
          } catch {}
          return originalOpenURL.call(window.Application, url);
        };
      }
    })();
