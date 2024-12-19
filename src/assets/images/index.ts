import BODY_BG from './BODY_BG.png';
import BODY_BG_LIGHT from './BODY_BG_LIGHT.jpg';
import CHECK_CIRCLE_NORMAL from './check-circle-normal.png';
import CHECK_CIRCLE_SUCCESS from './check-circle-success.png';
import HERO_BG from './HERO_BG.jpg';
import HOW_IMG1 from './how-to-img1.png';
import HOW_IMG2 from './how-to-img2.png';
import HOW_IMG3 from './how-to-img3.png';
import INSTANT_REFUND from './instant-refund-img.png';
import LOCATION_MARKER from './Location-marker.png';
import REFUNDED_CURRENT from './refunded-current.png';
import REFUNDED_FAILED from './refunded-failed.png';
import REFUNDED_NORMAL from './refunded-normal.png';
import REFUNDED_PASSED from './refunded-passed.png';
import REFUNDED_SUCCESS from './refunded-success.png';
import REJECT_FAILED from './reject-failed.png';
import REFUNDED_PARTIAL from './reject-partial.png';
import SCREEN_BG from './SCREEN_BG.jpg';
import SHIPPED_CURRENT from './shipped-current.png';
import SHIPPED_FAILED from './shipped-failed.png';
import SHIPPED_NORMAL from './shipped-normal.png';
import SHIPPED_PASSED from './shipped-passed.png';
import SHIPPING_CURRENT from './shipping-current.png';
import SHIPPING_FAILED from './shipping-failed.png';
import SHIPPING_NORMAL from './shipping-normal.png';
import SHIPPING_PASSED from './shipping-passed.png';
import SIDE_BG from './SIDE_BG.jpg';
import STORE_REVIEW_CURRENT from './store-review-current.png';
import STORE_REVIEW_FAILED from './store-review-failed.png';
import STORE_REVIEW_NORMAL from './store-review-normal.png';
import STORE_REVIEW_PASSED from './store-review-passed.png';
import SUBMITTED_CURRENT from './submitted-current.png';
import SUBMITTED_PASSED from './submitted-passed.png';
import TUTOR_IMG1 from './tutor-img-1.png';
import TUTOR_IMG2 from './tutor-img-2.png';
import TUTOR_IMG3 from './tutor-img-3.png';
import TUTOR_BG from './TUTOR_BG.jpg';
import WHATSAPP_LOGO from './WHATSAPP_LOGO.png';

const images = {
  HERO_BG,
  BODY_BG,
  HOW_IMG1,
  HOW_IMG2,
  HOW_IMG3,
  TUTOR_BG,
  TUTOR_IMG1,
  TUTOR_IMG2,
  TUTOR_IMG3,
  INSTANT_REFUND,
  BODY_BG_LIGHT,
  SCREEN_BG,
  SIDE_BG,
  LOCATION_MARKER,
  WHATSAPP_LOGO,
  statuses: {
    submitted: {
      current: SUBMITTED_CURRENT,
      passed: SUBMITTED_PASSED,
    },
    refunded: {
      normal: REFUNDED_NORMAL,
      current: REFUNDED_CURRENT,
      passed: REFUNDED_PASSED,
      failed: REFUNDED_FAILED,
      success: REFUNDED_SUCCESS,
    },
    shipping: {
      normal: SHIPPING_NORMAL,
      current: SHIPPING_CURRENT,
      passed: SHIPPING_PASSED,
      failed: SHIPPING_FAILED,
    },
    shipped: {
      normal: SHIPPED_NORMAL,
      current: SHIPPED_CURRENT,
      passed: SHIPPED_PASSED,
      failed: SHIPPED_FAILED,
    },
    storeReview: {
      normal: STORE_REVIEW_NORMAL,
      current: STORE_REVIEW_CURRENT,
      passed: STORE_REVIEW_PASSED,
      failed: STORE_REVIEW_FAILED,
    },
    completed: {
      normal: CHECK_CIRCLE_NORMAL,
      success: CHECK_CIRCLE_SUCCESS,
      failed: REJECT_FAILED,
      mixed: REFUNDED_PARTIAL,
    },
    success: CHECK_CIRCLE_SUCCESS,
    failed: REJECT_FAILED,
  },
};

export default images;
