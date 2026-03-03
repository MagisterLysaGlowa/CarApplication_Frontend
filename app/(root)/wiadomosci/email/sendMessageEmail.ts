const sendMessageEmail = async (
  userId: number,
  userObj: any,
  subject: string,
  message: any
) => {
  const userSenderResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/userByUserId/${userObj.userId}`
  );
  const userResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/Auth/userByUserId/${userId}`
  );
  const user = await userResponse.json();
  const userSender = await userSenderResponse.json();

  let welcome_message: string = "";
  let first_message: string = "";
  let username: string = "";
  let image_url = "";
  if (user.name && user.surname) {
    welcome_message = `Witaj ${user.name} ${user.surname}!`;
  } else {
    welcome_message = `Witaj ${user.username}!`;
  }

  if (message.content) {
    first_message = message.content;
  }

  if (userSender.username) {
    username = userSender.username;
  }

  if (userSender.avatarUrl.includes("/uploads/")) {
    image_url = `https://api.yourvehicle.pl/${userSender.avatarUrl}`;
  } else {
    image_url = user.avatarUrl;
  }

  const htmlEmail = `<!DOCTYPE html>
<html lang="pl">
  <head>
    <meta charset="UTF-8" />
    <title>Email</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: Inter, sans-serif;
      }
      .container {
        max-width: 500px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 32px;
        padding-bottom: 80px;
        overflow: hidden;
      }
      .inner {
        padding: 0 30px;
      }
      h3 {
        font-weight: 700;
        font-size: 24px;
        margin: 20px 0 10px;
      }
      p {
        font-weight: 400;
        font-size: 14px;
        color: #1e1e1e;
        margin: 0 0 15px;
      }
      .section-title {
        font-size: 14px;
        color: #0c0c0c;
        margin: 20px 0 5px;
        font-weight: 400;
      }
      .tag {
        background-color: #0066ff;
        color: white;
        padding: 3px 10px;
        border-radius: 8px;
        display: inline-block;
        font-size: 14px;
        margin-bottom: 5px;
      }
      .price {
        margin-top: 10px;
        font-size: 16px;
        font-weight: 400;
        color: #2f2f2f;
      }
      .price span {
        color: #0066ff;
        font-weight: 600;
      }
      .subprice {
        color: #747474;
        font-size: 14px;
        margin-top: 2px;
      }
      .data-section h6 {
        margin: 5px 0;
        font-size: 16px;
        font-weight: 600;
        color: #0c0c0c;
      }
      .divider {
        border-top: 1px solid #ccc;
        margin: 20px 0;
      }
      .flex-row {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
      }
      .sub-row {
        font-size: 14px;
        color: #747474;
        margin: 10px 0;
      }
      .button {
        display: block;
        width: 100%;
        background-color: #0066ff;
        color: white;
        text-align: center;
        padding: 16px 0;
        font-size: 16px;
        font-weight: 500;
        border-radius: 12px;
        text-decoration: none;
        margin-top: 30px;
      }
      .footer-text {
        text-align: center;
        max-width: 530px;
        font-size: 16px;
        font-weight: 400;
        margin: 35px auto 0;
        color: #000;
      }
      .footer-small {
        text-align: center;
        max-width: 530px;
        font-size: 16px;
        font-weight: 400;
        color: #000000;
        margin: 35px auto 80px;
      }
    </style>
  </head>
  <body>
    <div style="width: 100%; background-color: #f3f3f3; padding: 40px 0px;">
    <div class="container">
      <img
        src="https://yourvehicle.pl/email/header.webp"
        alt="header"
        style="width: 100%; display: block"
      />
      <div class="inner" style="color: #000000; background-color: #ffffff;">
        <h3 style="color: black;">${welcome_message}</h3>
        <p style="font-size: 16px">Otrzymałeś nową wiadomość</p>
        <div
          style="
            background-color: #fafafa;
            border-radius: 12px;
            border: 1px solid #e9e9e9;
            padding: 0px 20px;
            padding-bottom: 40px;
          "
        >
          <table>
            <tr>
              <td>
                <div
                  style="
                    width: 50px;
                    height: 50px;
                    border-radius: 100%;
                    background-color: #FAFAFA;
                    border: .12em solid #F2F2F2;
                  "
                >
                  <img
                    src="${image_url}"
                    style="
                      width: 100%;
                      height: 100%;
                      border-radius: 100%;
                      object-fit: fill;
                      aspect-ratio: 9/3;
                    "
                  />
                </div>
              </td>
              <td>
                <h5
                  style="
                    font-size: 24px;
                    font-weight: 700;
                    padding-left: 10px;
                    color: #272727;
                  "
                >
                  ${username}
                </h5>
              </td>
            </tr>
          </table>
          <hr style="border: 1px solid #e9e9e9" />
          <div
            style="
              margin-top: 25px;
              font-size: 16px;
              padding-left: 10px;
              color: #2f2f2f;
              line-height: 25px;
              font-weight: 100;
            "
          >
            ${first_message}
          </div>
        </div>

        <a href="https://yourvehicle.pl/wiadomosci" class="button" style="color: white;">Zobacz całą wiadomość</a>

        <hr
          style="
            border: 1px solid #e9e9e9;
            margin-top: 40px;
            margin-bottom: 40px;
          "
        />

        <p style="color: #1e1e1e; font-size: 16px; line-height: 23px">
          Jeśli wiadomość została otrzymana pomyłkowo, prosimy ją zignorować.
          Jeśli podejrzewasz, że ktoś korzysta z Twojego konta bez Twojej
          zgody, <span style="color: #01559d"
            >prosimy się z nami skontaktować.</span
          >
        </p>
      </div>
    </div>
    <p class="footer-text">
      Masz jakieś pytania? Zapoznaj się z naszą stroną FAQ, lub śmiało
      skontaktuj się z nami
    </p>
    <p class="footer-text"><a href="https://yourvehicle.pl/polityka" style="text-decoration: none; color: #0066FF;">Polityka prywatności</a> | <a href="https://yourvehicle.pl/regulamin" style="text-decoration: none; color: #0066FF;">Regulamin</a> | <a href="https://yourvehicle.pl/chce-kupic#contact" style="text-decoration: none; color: #0066FF;">FAQ</a></p>
    <p
      class="footer-small"
      style="color: #a5a5a5; font-size: 18px; line-height: 25px"
    >
      YourVechicle będzie przetwarzać dane użytkownika w celu sformalizowania,
      zarządzania i realizacji naszego stosunku umownego z użytkownikiem jako
      zarejestrowanym użytkownikiem. Użytkownik może skorzystać ze swoich praw
      dostępu, sprostowania, usunięcia, sprzeciwu, ograniczenia przetwarzania,
      przenoszenia, przejrzystości i niepodlegania zautomatyzowanym decyzjom pod
      adresem (...)
    </p>
    </div>
  </body>
</html>

`;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Mail`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: user.email,
      subject: subject,
      message: htmlEmail,
    }),
  });
};

export default sendMessageEmail;
