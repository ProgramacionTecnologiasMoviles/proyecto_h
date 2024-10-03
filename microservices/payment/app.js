function resultMessage(message) {
  // Find the paragraph element with the ID 'result-message'
  const resultMessageElement = document.getElementById("result-message");
  // Set the inner HTML of the element to the provided message
  resultMessageElement.innerHTML = message;
}

window.paypal
  .Buttons({
    style: {
      shape: "rect",
      layout: "vertical",
      color: "gold",
      label: "paypal",
    },

    async createOrder() {
      try {
        const response = await fetch("http://192.168.183.108:8000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const orderData = await response.json();

        if (orderData.data.id) {
          return orderData.data.id;
        }
        const errorDetail = orderData?.data.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : JSON.stringify(orderData);

        throw new Error(errorMessage);
      } catch (error) {
        console.error(error);
      }
    },

    async onApprove(data, actions) {
      try {
        const response = await fetch(
          `http://192.168.183.108:8000/api/capture`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId: data.orderID }),
          }
        );

        const responseJson = await response.json();

        const orderData = responseJson.data;

        const errorDetail = orderData?.details?.[0];

        if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
          // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          // recoverable state, per
          // https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
          return actions.restart();
        } else if (errorDetail) {
          // (2) Other non-recoverable errors -> Show a failure message
          throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
        } else if (!orderData.purchase_units) {
          throw new Error(JSON.stringify(orderData));
        } else {
          // (3) Successful transaction -> Show confirmation or thank you message
          // Or go to another URL:  actions.redirect('thank_you.html');
          const transaction =
            orderData?.purchase_units?.[0]?.payments?.captures?.[0] ||
            orderData?.purchase_units?.[0]?.payments?.authorizations?.[0];
          resultMessage(
            `Transaction ${transaction.status}: ${transaction.id}<br>
          <br>See console for all available details`
          );
          console.log(
            "Capture result",
            orderData,
            JSON.stringify(orderData, null, 2)
          );
        }
      } catch (error) {
        console.error(error);
        resultMessage(
          `Sorry, your transaction could not be processed...<br><br>${error}`
        );
      }
    },
  })
  .render("#paypal-button-container");
