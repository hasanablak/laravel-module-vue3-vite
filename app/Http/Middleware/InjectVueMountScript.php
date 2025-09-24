<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InjectVueMountScript
{
    /**
     * Vue app mounting script'ini response'a ekle
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (!$response instanceof Response || !$this->isHtmlResponse($response)) {
            return $response;
        }

        $content = $response->getContent();

        // Eğer içerikte </body> tag'i yoksa, bu HTML response değildir
        if (!str_contains($content, '</body>')) {
            return $response;
        }

        $script = $this->getMountScript();
        $preloader = $this->getPreloaderHtml();
        
        // Preloader'ı <body> tag'inin hemen sonrasına ekle
        $content = preg_replace('/<body([^>]*)>/', '<body$1>' . $preloader, $content);
        
        // Script'i </body> tag'inden hemen önce ekle
        $content = str_replace('</body>', $script . '</body>', $content);
        
        $response->setContent($content);
        
        return $response;
    }

    /**
     * Response'un HTML olup olmadığını kontrol et
     */
    protected function isHtmlResponse(Response $response): bool
    {
        $contentType = $response->headers->get('Content-Type');
        return $contentType && str_contains($contentType, 'text/html');
    }

    /**
     * Vue mounting script'ini oluştur
     */
    protected function getPreloaderHtml(): string 
    {
        if (config('app.env') !== 'production') {
            return '';
        }

        return '
        <!-- ===== Preloader Start ===== -->
        <div id="preloader" style="
            position: fixed;
            left: 0;
            top: 0;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100vw;
            height: 100vh;
            background-color: rgba(255, 255, 255, 1);">
            <div style="
                width: 64px;
                height: 64px;
                border: 4px solid #3498db;
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 1s linear infinite;">
            </div>
        </div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        <!-- ===== Preloader End ===== -->
        ';
    }

    protected function getMountScript(): string
    {
        return '
            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    if (window?.app?.mount) {
                        window.app.mount("#app");
                        ' . (config('app.env') === 'production' ? '
                        const loader = document.getElementById("preloader");
                        if (loader) {
                            loader.style.display = "none";
                        }' : '') . '
                    } else {
                        console.error("Vue app modülü bulunamadı");
                    }
                });
            </script>
        ';
    }
}
