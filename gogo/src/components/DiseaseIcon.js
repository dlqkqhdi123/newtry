import styles from "./DiseaseIcon.module.css";
import classNames from "classnames";
import sorhk from "../assets/내과.svg";
import dlfqksdhlrhk from "../assets/일반외과.svg";
import wjdguddhlrhk from "../assets/정형외과.svg";
// 공용
import dksrhk from "../assets/안과-dog.svg";
import clrhk from "../assets/치과-dog.svg";
import vlqnrhk from "../assets/피부과-dog.svg";
// 개
//고양이
import rhdiddlvlqnrhk from "../assets/피부과-cat.svg";
import rhdiddldksrhk from "../assets/안과-cat.svg";
import rhdiddlclrhk from "../assets/치과-cat.svg";
import rhdiddlrhwlfqud from "../assets/고양이고질병.svg";
//고양이 진료과 끗

// 개 시작
//개 내과
import rlrhkswldua from "../assets/dog/내과_기관지염.svg";
import tlawkdtktkdcnd from "../assets/dog/내과_심장사상충감염.svg";
import vPfua from "../assets/dog/내과_폐렴.svg";
import vPtnwhd from "../assets/dog/내과_폐수종.svg";
import ghddur from "../assets/dog/내과_홍역.svg";
//개내과 끗
//개 안과
import rkrakrdua from "../assets/dog/안과_각막염.svg";
import rufakrdua from "../assets/dog/안과_결막염.svg";
import shrsowkd from "../assets/dog/안과_녹내장.svg";
import qorsowkd from "../assets/dog/안과_백내장.svg";
import tprbstjddksrjadua from "../assets/dog/안과_세균성 안검염.svg";
import dksrnrjswhwmd from "../assets/dog/안과_안구건조증.svg";
import dkffpfmrltjddksrjadua from "../assets/dog/안과_알레르기성 안검염.svg";
import rkrakrrnpdid from "../assets/dog/안과_각막궤양.svg";
//개안과 끗
//개 일반외과
import qkdrhkddua from "../assets/dog/일반외과_방광염.svg";
import dyfhruftjr from "../assets/dog/일반외과_요로결석.svg";
import wjsflqtjsqleo from "../assets/dog/일반외과_전립선 비대.svg";
import gkdansskdwlfghks from "../assets/dog/일반외과_항문낭 질환.svg";
import dbtjswhddid from "../assets/dog/일반외과_유선종양.svg";
//개일반끗
//개정형외과
import rhrhkswjfxkfrn from "../assets/dog/정형외과_고관절 탈구.svg";
import rhfwjf from "../assets/dog/정형외과_골절.svg";
import rhkswjfdua from "../assets/dog/정형외과_관절염.svg";
import tmfrorhfxkfrn from "../assets/dog/정형외과_슬개골 탈구.svg";
// 개정형끗
// 개치과
import rnrkdwhddid from "../assets/dog/치과_구강종양.svg";
import rnsodua from "../assets/dog/치과_구내염.svg";
import dpskapfwlfgudtjdqnwjs from "../assets/dog/치과_에나멜질 형성부전.svg";
import cndcl from "../assets/dog/치과_충치.svg";
import clrmscjawndnlshddid from "../assets/dog/치과_치근첨주위농양.svg";
import clwnwlfghks from "../assets/dog/치과_치주 질환.svg";
// 개치과 끗
// 개피부과
import shdvlwmd from "../assets/dog/피부과_농피증.svg";
import enemfjrl from "../assets/dog/피부과_두드러기, 발진.svg";
import xkfah from "../assets/dog/피부과_탈모.svg";
import whddid from "../assets/dog/피부과_피부 종양.svg";
//개 피부과끗
// 개 끗

// 고양 시작
//고양 내과
import rmqtjddnldua from "../assets/cat/내과_급성위염.svg";
import ekdsyqud from "../assets/cat/내과_당뇨병.svg";
import akstjddnldua from "../assets/cat/내과_만성위염.svg";
import tlawkdvksakr from "../assets/cat/내과_심장판막.svg";
import dnprnpdid from "../assets/cat/내과_위궤양.svg";
// 고양 내과 끗
// 고양 안과
import rhdiddlrkrakrdua from "../assets/cat/안과_각막염.svg";
import rhdiddlrufakrdua from "../assets/cat/안과_결막염.svg";
import rhdiddlqorsowkd from "../assets/cat/안과_백내장.svg";
import dksdkqtkdtmd from "../assets/cat/안과_안압상승.svg";
import dksdhkduawmd from "../assets/cat/안과_안와염증.svg";
//고양 안과 끗
// 고양 정형외과
import rhdiddlrhfwjf from "../assets/cat/정형외과_골절.svg";
import rhdiddlrhkswjfdua from "../assets/cat/정형외과_관절염.svg";
import xkfrn from "../assets/cat/정형외과_탈구.svg";
//고양 정형 끗
//고양 치과
import cltjr from "../assets/cat/치과_치석.svg";
import cldkrufths from "../assets/cat/치과_치아 결손.svg";
import cldkrhftndua from "../assets/cat/치과_치아골수염.svg";
import clwndua from "../assets/cat/치과_치주염.svg";
// 고양 치과 끗
//고양 피부과
import duemfma from "../assets/cat/피부과_여드름.svg";
import wlsemrl from "../assets/cat/피부과_진드기.svg";
import vlqnwhddid from "../assets/cat/피부과_피부 종양.svg";
import vlqndua from "../assets/cat/피부과_피부염.svg";
// 고양 피부 끗
// 고양 고질병
import vkqhqkdlfjtm from "../assets/cat/고질병_파보바이러스.svg";
import felv from "../assets/cat/고질병_FeLV.svg";
import fip from "../assets/cat/고질병_FIP.svg";
import fiv from "../assets/cat/고질병_FIV.svg";
// 고양 고질병 끗

const ICONS = {
  rhdiddlvlqnrhk: rhdiddlvlqnrhk,
  rhdiddlclrhk: rhdiddlclrhk,
  sorhk: sorhk,
  dksrhk: dksrhk,
  rhdiddldksrhk: rhdiddldksrhk,
  dlfqksdhlrhk: dlfqksdhlrhk,
  wjdguddhlrhk: wjdguddhlrhk,
  vlqnrhk: vlqnrhk,
  clrhk: clrhk,
  rlrhkswldua: rlrhkswldua,
  rnrkdwhddid: rnrkdwhddid,
  tlawkdtktkdcnd: tlawkdtktkdcnd,
  whddid: whddid,
  xkfah: xkfah,
  enemfjrl: enemfjrl,
  shdvlwmd: shdvlwmd,
  clwnwlfghks: clwnwlfghks,
  clrmscjawndnlshddid: clrmscjawndnlshddid,
  cndcl: cndcl,
  dpskapfwlfgudtjdqnwjs: dpskapfwlfgudtjdqnwjs,
  rnsodua: rnsodua,
  tmfrorhfxkfrn: tmfrorhfxkfrn,
  rhkswjfdua: rhkswjfdua,
  rhfwjf: rhfwjf,
  rhrhkswjfxkfrn: rhrhkswjfxkfrn,
  wjsflqtjsqleo: wjsflqtjsqleo,
  qkdrhkddua: qkdrhkddua,
  dkffpfmrltjddksrjadua: dkffpfmrltjddksrjadua,
  dksrnrjswhwmd: dksrnrjswhwmd,
  tprbstjddksrjadua: tprbstjddksrjadua,
  qorsowkd: qorsowkd,
  shrsowkd: shrsowkd,
  rufakrdua: rufakrdua,
  rkrakrdua: rkrakrdua,
  ghddur: ghddur,
  vPtnwhd: vPtnwhd,
  vPfua: vPfua,
  gkdansskdwlfghks: gkdansskdwlfghks,
  dyfhruftjr: dyfhruftjr,
  rhdiddlrhwlfqud: rhdiddlrhwlfqud,
  rmqtjddnldua: rmqtjddnldua,
  ekdsyqud: ekdsyqud,
  akstjddnldua: akstjddnldua,
  tlawkdvksakr: tlawkdvksakr,
  dnprnpdid: dnprnpdid,
  rhdiddlrkrakrdua: rhdiddlrkrakrdua,
  rhdiddlrufakrdua: rhdiddlrufakrdua,
  rhdiddlqorsowkd: rhdiddlqorsowkd,
  dksdkqtkdtmd: dksdkqtkdtmd,
  dksdhkduawmd: dksdhkduawmd,
  rhdiddlrhfwjf: rhdiddlrhfwjf,
  rhdiddlrhkswjfdua: rhdiddlrhkswjfdua,
  xkfrn: xkfrn,
  cltjr: cltjr,
  cldkrhftndua: cldkrhftndua,
  clwndua: clwndua,
  duemfma: duemfma,
  wlsemrl: wlsemrl,
  vlqnwhddid: vlqnwhddid,
  vlqndua: vlqndua,
  cldkrufths: cldkrufths,
  vkqhqkdlfjtm: vkqhqkdlfjtm,
  felv: felv,
  fip: fip,
  fiv: fiv,
  dbtjswhddid: dbtjswhddid,
  rkrakrrnpdid: rkrakrrnpdid,

  // 넌 시작
};

function DiseaseIcon({ className, photoUrl = "default" }) {
  console.log(photoUrl);
  return (
    <img
      className={classNames(styles.diseaseIcon, className)}
      src={ICONS[photoUrl]}
      alt={photoUrl}
    />
  );
}

export default DiseaseIcon;
