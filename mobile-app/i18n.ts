import { I18n } from "i18n-js";
import { getLocales } from "expo-localization";

export const deviceLanguage = getLocales()?.[0]?.languageCode ?? "en";
const supportedLanguages = [
  "en",
  "fr",
  "ar",
  "es",
  "pr",
  "it",
  "ru",
  "zh",
  "jp",
];

export const i18n = new I18n({
  jp: {
    Send: "Send",
    Paste: "Paste",
    serverIP: "Enter server's IP",
    serverPort: "Enter server's port",
    deviceName: "Enter device's name",
    resetDb: "Reset clipboard database",
    settings: "Settings",
    wsStatus: "WebSocket Status",
    wsMessage: "Websocket connection closed",
    msgDeviceName: "Please enter a device name",
    copyClip: "Copy Clip",
    openLink: "Open Link",
  },
  fr: {
    Send: "Envoyer",
    Paste: "Coller",
    serverIP: "Entrez l'adresse IP du serveur",
    serverPort: "Entrez le port du serveur",
    deviceName: "Entrez le nom de l'appareil",
    resetDb: "Réinitialiser la base de données du presse-papiers",
    settings: "Paramètres",
    wsStatus: "Statut WebSocket",
    wsMessage: "Connexion WebSocket fermée",
    msgDeviceName: "Veuillez entrer un nom d'appareil",
    copyClip: "Copier le clip",
    openLink: "Ouvrir le lien",
  },
  ar: {
    Send: "إرسال",
    Paste: "لصق",
    serverIP: "أدخل عنوان IP الخاص بالخادم",
    serverPort: "أدخل منفذ الخادم",
    deviceName: "أدخل اسم الجهاز",
    resetDb: "إعادة تعيين قاعدة بيانات الحافظة",
    settings: "الإعدادات",
    wsStatus: "حالة WebSocket",
    wsMessage: "تم إغلاق اتصال WebSocket",
    msgDeviceName: "يرجى إدخال اسم الجهاز",
    copyClip: "نسخ المقطع",
    openLink: "فتح الرابط",
  },
  es: {
    Send: "Enviar",
    Paste: "Pegar",
    serverIP: "Ingrese la IP del servidor",
    serverPort: "Ingrese el puerto del servidor",
    deviceName: "Ingrese el nombre del dispositivo",
    resetDb: "Restablecer la base de datos del portapapeles",
    settings: "Configuraciones",
    wsStatus: "Estado de WebSocket",
    wsMessage: "Conexión WebSocket cerrada",
    msgDeviceName: "Por favor, ingrese un nombre de dispositivo",
    copyClip: "Copiar clip",
    openLink: "Abrir enlace",
  },
  pr: {
    Send: "Enviar",
    Paste: "Colar",
    serverIP: "Digite o IP do servidor",
    serverPort: "Digite a porta do servidor",
    deviceName: "Digite o nome do dispositivo",
    resetDb: "Redefinir banco de dados da área de transferência",
    settings: "Configurações",
    wsStatus: "Status do WebSocket",
    wsMessage: "Conexão WebSocket fechada",
    msgDeviceName: "Por favor, insira um nome de dispositivo",
    copyClip: "Copiar clipe",
    openLink: "Abrir link",
  },
  it: {
    Send: "Invia",
    Paste: "Incolla",
    serverIP: "Inserisci l'IP del server",
    serverPort: "Inserisci la porta del server",
    deviceName: "Inserisci il nome del dispositivo",
    resetDb: "Reimposta il database degli appunti",
    settings: "Impostazioni",
    wsStatus: "Stato WebSocket",
    wsMessage: "Connessione WebSocket chiusa",
    msgDeviceName: "Per favore, inserisci un nome del dispositivo",
    copyClip: "Copia il clip",
    openLink: "Apri il link",
  },
  ru: {
    Send: "Отправить",
    Paste: "Вставить",
    serverIP: "Введите IP-адрес сервера",
    serverPort: "Введите порт сервера",
    deviceName: "Введите имя устройства",
    resetDb: "Сбросить базу данных буфера обмена",
    settings: "Настройки",
    wsStatus: "Статус WebSocket",
    wsMessage: "Соединение WebSocket закрыто",
    msgDeviceName: "Пожалуйста, введите имя устройства",
    copyClip: "Копировать клип",
    openLink: "Открыть ссылку",
  },
  zh: {
    Send: "发送",
    Paste: "粘贴",
    serverIP: "输入服务器的IP",
    serverPort: "输入服务器的端口",
    deviceName: "输入设备名称",
    resetDb: "重置剪贴板数据库",
    settings: "设置",
    wsStatus: "WebSocket状态",
    wsMessage: "WebSocket连接已关闭",
    msgDeviceName: "请输入设备名称",
    copyClip: "复制剪辑",
    openLink: "打开链接",
  },
  en: {
    Send: "送信",
    Paste: "貼り付け",
    serverIP: "サーバーのIPを入力",
    serverPort: "サーバーのポートを入力",
    deviceName: "デバイス名を入力",
    resetDb: "クリップボードデータベースをリセット",
    settings: "設定",
    wsStatus: "WebSocketステータス",
    wsMessage: "WebSocket接続が閉じました",
    msgDeviceName: "デバイス名を入力してください",
    copyClip: "クリップをコピー",
    openLink: "リンクを開く",
  },
});

i18n.defaultLocale = deviceLanguage;

i18n.locale = supportedLanguages.includes(deviceLanguage)
  ? deviceLanguage
  : "en";
