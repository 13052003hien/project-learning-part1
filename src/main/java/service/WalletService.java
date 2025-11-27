package service;

import org.springframework.stereotype.Service;
import model.Wallet;
import repository.WalletRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WalletService {
    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public Wallet saveWallet(Wallet wallet) {
        wallet.setUpdatedAt(LocalDateTime.now());
        
        // Nếu set là default, cần unset các wallet khác
        if (wallet.getIsDefault()) {
            List<Wallet> userWallets = walletRepository.findByUserId(wallet.getUserId());
            for (Wallet w : userWallets) {
                if (!w.getId().equals(wallet.getId()) && w.getIsDefault()) {
                    w.setIsDefault(false);
                    walletRepository.save(w);
                }
            }
        }
        
        return walletRepository.save(wallet);
    }

    public List<Wallet> getAllWalletsByUserId(String userId) {
        return walletRepository.findByUserId(userId);
    }

    public Optional<Wallet> findById(String id) {
        return walletRepository.findById(id);
    }

    public Optional<Wallet> getDefaultWallet(String userId) {
        return walletRepository.findByUserIdAndIsDefault(userId, true);
    }

    public void deleteWallet(String id) {
        walletRepository.deleteById(id);
    }

    public void updateBalance(String walletId, Double amount) {
        Optional<Wallet> walletOpt = walletRepository.findById(walletId);
        if (walletOpt.isPresent()) {
            Wallet wallet = walletOpt.get();
            wallet.setBalance(wallet.getBalance() + amount);
            wallet.setUpdatedAt(LocalDateTime.now());
            walletRepository.save(wallet);
        }
    }

    public void initializeDefaultWallet(String userId) {
        Wallet defaultWallet = new Wallet();
        defaultWallet.setUserId(userId);
        defaultWallet.setName("Ví tiền mặt");
        defaultWallet.setType("CASH");
        defaultWallet.setIcon("💵");
        defaultWallet.setColor("#51CF66");
        defaultWallet.setBalance(0.0);
        defaultWallet.setIsDefault(true);
        walletRepository.save(defaultWallet);
    }
}
