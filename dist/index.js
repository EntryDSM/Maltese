import React, { useRef, useState, useCallback, useEffect } from 'react';
import socketio from 'socket.io-client';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import styled, { css, keyframes } from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const baseURL = "https://schnauzer.entrydsm.hs.kr";
//# sourceMappingURL=endpoints.js.map

const socketConnect = () => socketio(baseURL, {
    transports: ["websocket"],
});
const authentication = (socket) => (data) => {
    socket === null || socket === void 0 ? void 0 : socket.emit("authentication", data);
};
const sendMessage = (socket) => (data) => {
    socket === null || socket === void 0 ? void 0 : socket.emit("new message", data);
};
const listenOnReceiveMessage = (socket) => (listener) => {
    socket === null || socket === void 0 ? void 0 : socket.on("receive message", listener);
};
const listenOnError = (socket) => (listener) => {
    socket === null || socket === void 0 ? void 0 : socket.on("save error", listener);
};
const removeReceiveMessageListener = (socket) => {
    socket === null || socket === void 0 ? void 0 : socket.removeListener("receive message");
};
const removeErrorListener = (socket) => {
    socket === null || socket === void 0 ? void 0 : socket.removeListener("save error");
};
//# sourceMappingURL=socket.js.map

var CloseMark = "data:image/png;base64,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";

var OpenMark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAeKADAAQAAAABAAAAeAAAAAArKnfUAAAF/klEQVR4Ae2dS4gdRRSGe8RFBHXhA58hqBhUAiEgKopkoxFERBF05VI3okJUhMSFQkRkxmfMxqyycSMS1L0bB0ES0IX4ItGFQRAVF0Z0IY5/wcykc2+f7lNdVV2n6v4Nxe0+XXXOX/93+3ZP35mepuFCB+gAHaADdIAO0AE6QAfogJ8DS37dm2ZtbW0HxtyPdgfa9Whb0bagLcryDyb6E9r3aKtoHy4tLX2DV5OLGjDAXo0ZvIb2sMmZ5BX1HsrvBehf8sqYr64CDLjXYeinaFfMp2Bk3YEf8bobkN3RbWYZBAy426H2M7SLzai2K+RnSLvNEuRewIB7CQQfR9tm11Nzyr6GolsB+bQFZecMiHgV+wl3wKSZ3Tdhe/9MLNumeATj6L0BqsxeHWZzTF/4UhzFv+m7p+nZdwQ/kKbkwmS918JM+wDvsSCwYA13WdDeB9hdPXMZ78DO8UPjjew7B6/FK7OQmf7COfj83DMn4IQEAFj0N2HZs1L3fUSf1ZEbZTpAwGVyU6smYLVVZXYk4DK5qVUTsNqqMjsScJnc1KoJWG1VmR0JuExuatUErLaqzI7nlim7LtX4avZKzOjxjln9jZj7FaCTuCn2ecf+wZB4Kw1FeS960L7+DtpblbD6ZmQ61p+tcbA/QtuPvCcH+m7u5kf0phXmV86DwkfQTuAN8axWLQFrnbLVbxmQX9ZIImCNSzb77APkZ4akEfCQQ7b3rwDynX0SCbjPnTL2vdUnk4D73Clj3y4cxbdLUglYcqas+D2SXAKWnCkr7v7Ss3Mh4E5bigteKykmYMmZsuLXSHIJWHKmkjgBVwJSmgYBS85UEifgSkBK0yBgyZlK4gRcCUhpGgQsOVNJnIArASlNg4AlZyqJE3AlIKVpELDkTCVxAq4EpDQNApacqSROwJWAlKZBwJIzlcQJuBKQ0jQIWHImPO6ePJt9IeB0CEw8N5qA0wH+JF1qfWYC1nvl2/N93wEp+hNwCleb5mP8iecXaVL7ZSVgP780vd3f8e7VdJyiDwHHd/lRHL0n4qcdl5GAx/kmjXoecD+QduaI8xkdcVz/AWkeA1wTV87tKRFw2w2/9T/RfRXtKMAe9hs6Xe+pAbuPr6+mm16SSr8j6yqgmrhKHprhlIAPw5SuRwUNaeT+AAemusgi3ABIIUOnAEy4IYQCx6YGTLiBgEKHpwR8kOdcNR7xiYPqDELHVIDfBtynhJoMzztw+XwoTiQF4DcB9+k48hYmy57JZ4pH84xZXp9caOEFYfJlaKfHmN0e421De7By/Q3vIgs+AL5egHZM6W9vN28re7PN71z2LrDAA2DfFrQH0b6dt3JcRLIzxp2sFZxzn5MKtOOQfh+21Y/CbY+taN09FviWqeYTCvgdLdz1CV2F191TTY51mibkKtoduU/SRNsOjAWs/li2Pf361Y0BTLgFvS98Ab/iec6dteLf2QC30zrgA9gdufsC5fwaOJ7DPR3QAj4QeORuyDq1scLXaRwQv8VwP26vS3gJcF+MIQcp3RvqD7QLY+RjjjMOgFEny6Ej+IVYcJ0U5PoPL0fPyOJaagc6qbuiONoc3AOxBSDvduT8LnbeRc8HVp0sO4OpzQLkFdQY/J8/qXXUlN8aYHeL9DjazppMzjkXCfDQOTiJZohxPw+7Lx6+TFKASTcdyALYVQfkU2i7sHpoUw1XojuQ5Rw8O4v1C68nEL8b7cbZ/dwedkD6iDYBuC0fsC/Ctvs/QO78HPp1Zju1lfUdEPJQbDES4Nh1mE/hAN7ER9CiLoqy7DKlA6D7bkzCU2pnLaUDMSErS7Lb1A7Egjy1btbzcCAGZI9y7JrDgVDIOTSzpqcDIZA9S7F7LgfGQs6ll3VHOADIB9G8lhFlOCSnA6DrBTmnVtYe6YAP5JElOCy3A1rIuXWyfoADGsgB6TnUggNDkC1opIZAB/ogB6bmcCsOAPIy2txiRR91RHAAdOcgR0jLFJYcmIVsSRu1RHKgDTlSSqax5sAGZGu6qCeiAw5yxHRMRQfoAB2gA3SADtABOkAHFtyB/wGnVrZsA532eAAAAABJRU5ErkJggg==";

var SendMark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAYAAABV7bNHAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAASKADAAQAAAABAAAASAAAAACz+WTVAAADeElEQVR4Ae2aUW7TQBBAZ9xUIAFq+KHqV8wnQi25AblBwwlIOUFvQLhBOACVOQHhBMAJKK0Qn02/UsFHK7VIRG09zFpZiKp6bMexvbuxf5x61q7nZV52tbsA9VETqAnUBGoCNQFbCaB68d73n20vDF/zxy4RjPjiMFylt8GTjZGKL/OBUzhfYyAMQ2BQmxufY+LOX8adg5MhImxLmaqqAs/r073Vj8Hjh2dSW9diCtApA2qmSYxBnbF+wTLph68OTygNnFvaLIV+eQBFzFzXLzcgXVmu6rcwQBrU9OyMfkUBcka/QgHpqrJZv1IAaVA26lcFIKv0qwyQrirT9asckAZlqn6mATJOPyMB6aoyQT+jAWlQVepnE6BK9LMOkK6qsvSzFpAGVbR+rgAqTD8GNB4BYGv6TThxWqR+HhMJnKAyk0Q0hYyw613hEc+Yfugdjjsz4Uwfo2WfnYNxgIgvM91pWWOuqrkWHiJAKtdo+YfCDhA1eZK6g4BqIv+ZZRwSXzerfv8AxT2592PswxX4HoEPCD4RtgGpidEZ1uLus+R64sxnIqCkRLXf/GPWoajqqG1b9Un65QYkAbSt+m7Tr1BAEjwVM7v6sL+3uf6mUkASQDOqj8wFJMGLrz7wFznoVb9NxlZQEqC4+M7Br+eE19xRQBcI2tGgMa5xiuvWAVLq4WWjpSB4016Tx21NTqSTIt+sTb4ZB6h3dNrE8yseoF43eXTf5irwCclXZ64GP2uGedrzWO9FJYDUqB2vcU1XAQF1VCIFVcEcjOgYydt9t7U+LASQSVWQhQ5/UV+QINjb2gj0fXMDMr8KdIrJZyJ6Tysrg+Dpo/2brWMB2VoFNxOM/5uOORaE9+8OpG2FEaAIxu/LbaSwW2CPEP+uJUZu00j69xjBuZh8YlJtqaHtMUkjKbcGnv8ZRN2p1MraWDqNpPQa3LmKW4Clm02NZdVIyqORdyguPbzs2LwaSe/JFWT7kV8jiYC1gBapkVOAitDIAUDFamQtoLI0sg5Q2RpZAqg6jYwGZIJGRgIySSODAJmpUeWATNeoMkC2aFQyIPs0KgWQzRoVCsgFjQoA5JZGCYBUsul2ubqqkQiIt9Tt86xiS2rkukZS7g16cKeH55MRr/ve2G+4PBpJgP6vi11M+gDEmwXwDIGGs8uv0gPqWE2gJlATyEHgLwfHUb5LbIhJAAAAAElFTkSuQmCC";

function Loading() {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", style: {
            margin: "auto",
            background: "rgb(253, 253, 253)",
            WebkitAnimationPlayState: "running",
            animationPlayState: "running",
            WebkitAnimationDelay: "0s",
            animationDelay: "0s",
        }, width: "200", height: "200", display: "block", preserveAspectRatio: "xMidYMid", viewBox: "0 0 100 100" },
        React.createElement("circle", { cx: "50", cy: "50", r: "35", fill: "none", stroke: "#62d3e8", strokeDasharray: "164.93361431346415 56.97787143782138", strokeWidth: "10", style: {
                WebkitAnimationPlayState: "running",
                animationPlayState: "running",
                WebkitAnimationDelay: "0s",
                animationDelay: "0s",
            }, transform: "rotate(39.428 50 50)" },
            React.createElement("animateTransform", { attributeName: "transform", dur: "1s", keyTimes: "0;1", repeatCount: "indefinite", type: "rotate", values: "0 50 50;360 50 50" }))));
}
//# sourceMappingURL=loading.js.map

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const responseStatus = (status) => {
    return {
        _200: status === 200,
        _400: status === 400,
        _401: status === 401,
        _403: status === 403,
        _404: status === 404,
    };
};
const authorizationHeader = (accessToken) => ({
    Authorization: `Bearer ${accessToken}`,
});
const instanceAxios = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});
const getChatsApi = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield instanceAxios.get("/v5/qna/chats", {
            headers: authorizationHeader(payload.accessToken),
            params: {
                offset: payload.offset,
            },
        });
        return { data: response.data, status: response.status };
    }
    catch (_err) {
        const err = _err;
        return { data: [], status: ((_a = err.response) === null || _a === void 0 ? void 0 : _a.status) || 0 };
    }
});
//# sourceMappingURL=apis.js.map

const Loading$1 = styled.div `
  width: 100%;
  padding: 2px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  > svg {
    width: 20px;
    height: 20px;
  }
`;
//# sourceMappingURL=index.js.map

const LoadingBar = () => {
    return (React.createElement(Loading$1, null,
        React.createElement(Loading, null)));
};
const InfinityScroll = ({ loadMore, hasMore, children }) => {
    return (React.createElement(InfiniteScroll, { pageStart: 0, loadMore: loadMore, loader: React.createElement(LoadingBar, { key: "loading" }), hasMore: hasMore, useWindow: false, isReverse: true, threshold: 10 }, children));
};
//# sourceMappingURL=index.js.map

function convertTimeStempToSentence(timeStemp) {
    const date = timeStemp.split("T")[0].split("-");
    const time = timeStemp.split("T")[1].split(".")[0].split(":");
    return `${date[0]}년${date[1]}월${date[2]}일 ${time[0]}시${time[1]}분`;
}
//# sourceMappingURL=convert.js.map

var Thema;
(function (Thema) {
    Thema["MAIN_COLOR_1"] = "#62d3e8";
    Thema["MAIN_COLOR_2"] = "#ffffff";
    Thema["MAIN_HOVER"] = "#3ccce6";
    Thema["MAIN_ACTIVE"] = "#19c4e4";
    Thema["SERVE_COLOR_1"] = "#ededed";
    Thema["SERVE_COLOR_2"] = "#000000";
    Thema["SERVE_COLOR_3"] = "#6f6f6f";
    Thema["SERVE_COLOR_4"] = "#fdfdfd";
    Thema["WARNING_COLOR"] = "#ff6969";
    Thema["DEFAULT_SHADOW"] = "0 4px 8px 0 rgba(0, 0, 0, 0.16)";
    Thema["DEFAULT_RADIUS"] = "12px";
})(Thema || (Thema = {}));
//# sourceMappingURL=Thema.js.map

const Wrapper = styled.div `
  flex: 1;
  max-height: 325px;
  overflow-y: scroll;
  display: flex;

  > div {
    width: 100%;
    height: 100%;
  }
`;
const WarningMeassage = styled.p `
  font-size: 20px;
  color: red;
`;
const ChatBubble = styled.div `
  width: 100%;
  margin-top: 4px;
  display: flex;
  justify-content: ${({ isAdmin }) => (isAdmin ? "flex-end" : "flex-start")};

  > p {
    margin: 0;
    width: fit-content;
    position: relative;
    max-width: 260px;
    min-height: 36px;
    padding: 10px 12px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: ${Thema.DEFAULT_RADIUS};
    border-bottom-left-radius: ${({ isAdmin }) => !isAdmin && 0};
    border-bottom-right-radius: ${({ isAdmin }) => isAdmin && 0};
    background: ${({ isAdmin }) => isAdmin ? Thema.MAIN_COLOR_1 : Thema.SERVE_COLOR_1};
    color: ${({ isAdmin }) => isAdmin ? Thema.MAIN_COLOR_2 : Thema.SERVE_COLOR_2};

    > span {
      display: none;
      font-size: 11px;
      color: #ffffff;
      max-width: 80px;
      background: #000000;
      padding: 5px;
      position: absolute;
      border-radius: 2px;
      top: 50%;
      transform: translateY(-50%);
      left: ${({ isAdmin }) => isAdmin && "-100px"};
      right: ${({ isAdmin }) => !isAdmin && "-100px"};
      ${({ isAdmin }) => isAdmin
    ? css `
              &:after {
                left: 100%;
                top: 50%;
                border: solid transparent;
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
                border-color: rgba(0, 0, 0, 0);
                border-left-color: #000;
                border-width: 6px;
                margin-top: -6px;
              }
            `
    : css `
              &:after {
                right: 100%;
                top: 50%;
                border: solid transparent;
                content: " ";
                height: 0;
                width: 0;
                position: absolute;
                pointer-events: none;
                border-color: rgba(0, 0, 0, 0);
                border-right-color: #000;
                border-width: 6px;
                margin-top: -6px;
              }
            `}
    }

    &:hover {
      > span {
        display: block;
      }
    }
  }
`;
const EmptyData = styled.p `
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: ${Thema.MAIN_COLOR_1};
`;
//# sourceMappingURL=index.js.map

const ChattingText = ({ token, socket, errorHandler }) => {
    const infinityScrollRef = useRef(null);
    const didMountRef = useRef(false);
    const [data, setData] = useState(null);
    const [page, setPage] = useState(0);
    const [warningMeassage, setWarningMeassage] = useState("");
    const [isScroll, setIsScroll] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const fetchMoreData = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        const chatData = yield getChatsApi({
            offset: (data === null || data === void 0 ? void 0 : data.length) || 0,
            accessToken: token,
        });
        const { _200, _401 } = responseStatus(chatData === null || chatData === void 0 ? void 0 : chatData.status);
        if (_200) {
            yield setData([...chatData.data, ...(data || [])]);
        }
        else if (_401) {
            setWarningMeassage("토큰이 만료되었습니다. 채팅을 다시 열어주세요.");
            errorHandler(chatData === null || chatData === void 0 ? void 0 : chatData.status);
            setHasMore(false);
        }
        else {
            errorHandler(chatData === null || chatData === void 0 ? void 0 : chatData.status);
            setHasMore(false);
        }
        yield setIsScroll(true);
        yield setPage(page + 1);
        if ((chatData === null || chatData === void 0 ? void 0 : chatData.data.length) === 0) {
            setHasMore(false);
        }
    }), [data, page]);
    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true;
            listenOnReceiveMessage(socket)((chatData) => {
                setIsScroll(false);
                setData((v) => (v === null || v === void 0 ? void 0 : v.concat(chatData)) || [chatData]);
            });
            listenOnError(socket)((error) => {
                switch (error.code) {
                    case "c01":
                        setWarningMeassage("API가 존재하지 않습니다.");
                        break;
                    case "c02":
                        setWarningMeassage("파라미터 값이 비어있습니다");
                        break;
                    case "a01":
                        setWarningMeassage("유저 정보가 옳바르지 않습니다.");
                        break;
                    case "a02":
                        setWarningMeassage("확인할 수 없는 유저입니다.");
                        break;
                    case "d01":
                        setWarningMeassage("데이터베이스에 저장하는데 문제가 생겼습니다.");
                        break;
                    default:
                        setWarningMeassage("X");
                }
            });
        }
        return () => {
            removeReceiveMessageListener(socket);
            removeErrorListener(socket);
        };
    }, []);
    useEffect(() => {
        var _a, _b;
        if (!isScroll) {
            (_a = infinityScrollRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0, (_b = infinityScrollRef.current) === null || _b === void 0 ? void 0 : _b.scrollHeight);
        }
    }, [data]);
    return (React.createElement(Wrapper, { ref: infinityScrollRef }, warningMeassage ? (React.createElement(WarningMeassage, null, warningMeassage)) : (React.createElement(InfinityScroll, { loadMore: fetchMoreData, hasMore: hasMore }, data === null || data.length === 0 ? (React.createElement(EmptyData, { key: "intro" }, "EntryDSM\uC5D0 \uAD81\uAE08\uD55C\uC810\uC774 \uC788\uC73C\uC2E0\uAC00\uC694?")) : (data.map((v) => (React.createElement(ChatBubble, { key: v.qna_id.toString(), isAdmin: v.to === "admin" },
        React.createElement("p", null,
            v.content,
            React.createElement("span", null, convertTimeStempToSentence(v.created_at)))))))))));
};
//# sourceMappingURL=index.js.map

const Wrapper$1 = styled.div `
  width: 100%;
  min-height: 30px;
  max-height: 60px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > textarea {
    border: none;
    width: 328px;
    min-height: 30px;
    max-height: 60px;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 9px 16px;
    resize: none;
    background-color: ${Thema.SERVE_COLOR_1};
    color: ${Thema.SERVE_COLOR_3};
    font-size: 12px;

    &::-webkit-scrollbar {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }

    &:focus {
      outline: none;
    }
  }

  > button {
    all: unset;
    cursor: pointer;
    transition: 0.2s;

    &:active {
      opacity: 0.2;
      transition-duration: 0s;
    }

    > img {
      width: 24px;
      height: 24px;
    }
  }
`;
//# sourceMappingURL=index.js.map

const ChattingSender = ({ socket }) => {
    const [message, setMessage] = useState("");
    const send = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (message.trim() === "") {
            return;
        }
        yield sendMessage(socket)({ content: message });
        yield setMessage("");
    }), [message]);
    const handleKeyPress = useCallback((event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            send();
        }
    }, [send]);
    const messageHandler = useCallback(({ target: { value } }) => {
        setMessage(value);
    }, []);
    return (React.createElement(Wrapper$1, null,
        React.createElement(TextareaAutosize, { value: message, onChange: messageHandler, onKeyPress: handleKeyPress, maxRows: 4, placeholder: "\uBA54\uC138\uC9C0\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694" }),
        React.createElement("button", { onClick: send },
            React.createElement("img", { src: SendMark, alt: "\uC804\uC1A1" }))));
};

const Wrapper$2 = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  > p {
    color: ${Thema.WARNING_COLOR};
    font-size: 24px;
  }
`;
//# sourceMappingURL=index.js.map

const NotLogin = () => {
    return (React.createElement(Wrapper$2, null,
        React.createElement("p", null, "\uB85C\uADF8\uC778 \uD6C4 \uC774\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4")));
};
//# sourceMappingURL=index.js.map

const downToUp = keyframes `
  0% {
    height: 42px;
    opacity: 0.3;
  }
  30% {
    height: 42px;
    opacity: 1;
  }
  100% {
    height: 450px;
  }
`;
const upToDown = keyframes `
  0% {
    height: 450px;
  }
  30% {
    height: 42px;
    opacity: 1;
  }
  100% {
    height: 42px;
    opacity: 0;
  }
`;
const fadeIn = keyframes `
  0% {
    opacity: 0;
  }

  70% {
    opacity: 0;
    transform: scale( 0.98 );
  }

  100% {
    opacity: 1;
    transform: scale( 1 );
  }
`;
const fadeOut = keyframes `
  0% {
    opacity: 1;
    transform: scale( 1 );
  }

  70% {
    opacity: 0;
    transform: scale( 0.98 );
  }

  100% {
    opacity: 0;
  }
`;
//# sourceMappingURL=animation.js.map

const Wrapper$3 = styled.div `
  animation: ${({ isOpen }) => (isOpen ? downToUp : upToDown)} 1s ease-in-out
    forwards;

  width: 400px;
  overflow: hidden;
  border-radius: ${Thema.DEFAULT_RADIUS};
  border: solid 2px ${Thema.MAIN_COLOR_1};
  background-color: ${Thema.SERVE_COLOR_4};
  margin-bottom: 10px;

  > header {
    width: 100%;
    height: 42px;
    padding: 0 15px;
    box-sizing: border-box;
    line-height: 42px;
    font-size: 20px;
    color: ${Thema.SERVE_COLOR_4};
    background-color: ${Thema.MAIN_COLOR_1};
    -webkit-user-drag: none;
    -ms-user-select: none;
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
  }

  > div {
    animation: ${({ isOpen }) => (isOpen ? fadeIn : fadeOut)} 1.5s ease-out
      forwards;

    width: 100%;
    height: 408px;
    box-sizing: border-box;
    padding: 16px;
  }
`;
const MessageView = styled.div `
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
//# sourceMappingURL=index.js.map

const Chatting = ({ isOpen, isLogin, token, socket, errorHandler, }) => {
    const [animationRender, setAnimationRender] = useState(isOpen);
    useEffect(() => {
        if (isOpen) {
            setAnimationRender(true);
        }
    }, [isOpen]);
    const onAnimationEnd = () => {
        if (!isOpen) {
            setAnimationRender(false);
        }
    };
    return animationRender ? (React.createElement(Wrapper$3, { isOpen: isOpen, onAnimationEnd: onAnimationEnd },
        React.createElement("header", null, "QnA"),
        React.createElement("div", null, isLogin && !!token ? (React.createElement(MessageView, null,
            React.createElement(ChattingText, { errorHandler: errorHandler, socket: socket, token: token }),
            React.createElement(ChattingSender, { socket: socket }))) : (React.createElement(NotLogin, null))))) : null;
};
//# sourceMappingURL=index.js.map

const Wrapper$4 = styled.div `
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  right: 40px;
  bottom: 40px;

  > button {
    all: unset;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    background-color: ${Thema.MAIN_COLOR_1};
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: ${Thema.DEFAULT_SHADOW};
    transition: ease-in-out 0.2s;
    cursor: pointer;

    &:hover {
      background-color: ${Thema.MAIN_HOVER};
    }
    &:active {
      background-color: ${Thema.MAIN_ACTIVE};
    }

    > img {
      width: 40px;
      height: 40px;
      -webkit-user-drag: none;
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -khtml-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }
  }
`;
//# sourceMappingURL=index.js.map

const Messenger = ({ isLogin, token, socket, errorHandler }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isOpenHandler = useCallback(() => {
        setIsOpen(!isOpen);
    }, [isOpen]);
    useEffect(() => {
        setIsOpen(false);
    }, [token]);
    useEffect(() => {
        [OpenMark, CloseMark].forEach((picture) => {
            const img = new Image();
            img.src = picture.fileName;
        });
    }, []);
    return (React.createElement(Wrapper$4, null,
        React.createElement(Chatting, { token: token, isOpen: isOpen, isLogin: isLogin, socket: socket, errorHandler: errorHandler }),
        React.createElement("button", { onClick: isOpenHandler },
            React.createElement("img", { src: isOpen ? CloseMark : OpenMark, alt: "\uCC44\uD305\uCC3D \uC5F4\uAE30" }))));
};
//# sourceMappingURL=index.js.map

const Views = ({ isLogin, token, errorHandler }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        if (token && !isConnected) {
            const connected = socketConnect();
            setSocket(connected);
            setIsConnected(true);
            authentication(connected)({
                token: token || "",
                type: "student",
            });
        }
    }, [token]);
    return (React.createElement(Messenger, { socket: socket, isLogin: isLogin, token: token || "", errorHandler: errorHandler }));
};
//# sourceMappingURL=index.js.map

//# sourceMappingURL=index.js.map

export default Views;
