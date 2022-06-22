<template>
    <div>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>
<script setup>
definePageMeta({
    transition: {
        name: "page",
    },
});
useHead({
    title: "Secure your handle now - PreReg with Tonto now.",
    viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    charset: "utf-8",
    script: [
        {
            hid: "fbpixel",
            children: `!function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '3238823119770267');
              fbq('track', 'PageView');`,
            type: "text/javascript",
        },
        {
            hid: "gtag",
            children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TV653HH');`,
            type: "text/javascript",
        },
    ],
    meta: [
        {
            name: "description",
            content: "Secure your handle now - PreReg with Tonto now.",
        },
    ],
});
</script>

<style>
body {
    background-color: #109c90;
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.7s ease-in;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.list-enter-active,
.list-leave-active {
    transition: all 0.8s ease-in;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(10px);
}
/* "page" is hardcoded in nuxt3 page transitions atm */
.page-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.page-enter-active,
.page-leave-active {
    transition: all 0.3s;
}
.page-enter,
.page-leave-to {
    opacity: 0;
}
.layout-enter-from {
    opacity: 0;
    transform: translateX(-10px);
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.2s;
}
.layout-enter,
.layout-leave-to {
    opacity: 0;
}
</style>
